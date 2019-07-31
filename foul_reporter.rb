require 'sinatra'
require 'prawn'
require 'prawn/table'
require 'json'
require 'google/apis/sheets_v4'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'fileutils'

OOB_URI = 'urn:ietf:wg:oauth:2.0:oob'.freeze
APPLICATION_NAME = 'Google Sheets API Ruby Quickstart'.freeze
CREDENTIALS_PATH = 'credentials.json'.freeze
# The file token.yaml stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
TOKEN_PATH = 'token.yaml'.freeze
SCOPE = Google::Apis::SheetsV4::AUTH_SPREADSHEETS
SPREADSHEET_ID = "1TNu8arj9oHR952By5IVUq3vJ90vR18ve5H_33NvsjCk"


##
# Ensure valid credentials, either by restoring from the saved credentials
# files or intitiating an OAuth2 authorization. If authorization is required,
# the user's default browser will be launched to approve the request.
#
# @return [Google::Auth::UserRefreshCredentials] OAuth2 credentials
def authorize
  client_id = Google::Auth::ClientId.from_file(CREDENTIALS_PATH)
  token_store = Google::Auth::Stores::FileTokenStore.new(file: TOKEN_PATH)
  authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store)
  user_id = 'default'
  credentials = authorizer.get_credentials(user_id)
  if credentials.nil?
    url = authorizer.get_authorization_url(base_url: OOB_URI)
    puts 'Open the following URL in the browser and enter the ' \
         "resulting code after authorization:\n" + url
    code = gets
    credentials = authorizer.get_and_store_credentials_from_code(
      user_id: user_id, code: code, base_url: OOB_URI
    )
  end
  credentials
end


# Initialize the API
service = Google::Apis::SheetsV4::SheetsService.new
service.client_options.application_name = APPLICATION_NAME
service.authorization = authorize


configure do
  enable :cross_origin
end
before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options '/api/storereport' do
	headers 'Access-Control-Allow-Origin' => '*'
end

post '/api/storereport' do
	headers 'Access-Control-Allow-Origin' => '*'

	#Get number of fouls already in spreadsheet
	spreadsheet_id = SPREADSHEET_ID
	gameid_range = '2018 Fouls!A2:A'

	range = '2018 Fouls'
	response = service.get_spreadsheet_values(spreadsheet_id, range)

	puts response.values.count
	starting_row = response.values.count+1
	puts "Starting row: " + starting_row.to_s
	request.body.rewind
  	payload = JSON.parse request.body.read

  	puts payload
  	puts payload['date']
  	#if(!params[:override])
  	#	response.values.each do |row|
	#		if row[2] == payload['gameID']
	#			halt 400, 'Game exists'
	#		end
	#	end
	#end

  	rows = []
  	payload['rows'].each do |foul|
  		foul_split = foul['foul'].split(' - ')
  		foul['officials'].each do |calling_official|
  			spreadsheet_values = []
  			spreadsheet_values.push payload['date']
  			spreadsheet_values.push payload['homeTeam']
	  		spreadsheet_values.push payload['gameID']
	  		spreadsheet_values.push foul['quarter']
	  		spreadsheet_values.push foul['time']
	  		spreadsheet_values.push foul['team']
	  		spreadsheet_values.push foul_split[0]
	  		spreadsheet_values.push foul_split[1]
	  		spreadsheet_values.push foul['comments']
	  		spreadsheet_values.push foul['unit']
	  		spreadsheet_values.push foul['number']
	  		spreadsheet_values.push foul['choice']
  		
	  		puts calling_official
	  		if calling_official == 'R'
	  			spreadsheet_values.push 'R'
	  			spreadsheet_values.push payload['referee']
	  		end
	  		if calling_official == 'U'
	  			spreadsheet_values.push 'U'
	  			spreadsheet_values.push payload['umpire']
	  		end
	  		if calling_official == 'H'
	  			spreadsheet_values.push 'H'
	  			spreadsheet_values.push payload['headLinesman']
	  		end
	  		if calling_official == 'L'
	  			spreadsheet_values.push 'L'
	  			spreadsheet_values.push payload['lineJudge']
	  		end
	  		if calling_official == 'F'
	  			spreadsheet_values.push 'F'
	  			spreadsheet_values.push payload['fieldJudge']
	  		end
	  		if calling_official == 'S'
	  			spreadsheet_values.push 'S'
	  			spreadsheet_values.push payload['sideJudge']
	  		end
	  		if calling_official == 'B'
	  			spreadsheet_values.push 'B'
	  			spreadsheet_values.push payload['backJudge']
	  		end
  		
  		
  			spreadsheet_values.push foul['hudl']
  		
  			rows.push spreadsheet_values
  		end
  	end

  	range_name = "2018 Fouls!" + starting_row.to_s + ":" + (starting_row+rows.count+1).to_s
  	puts "Range name: " + range_name
  	puts rows
	value_range_object = Google::Apis::SheetsV4::ValueRange.new(range: range_name,
	                                                            values: rows)
	result = service.update_spreadsheet_value(spreadsheet_id,
	                                          range_name,
	                                          value_range_object,
	                                          value_input_option: 'USER_ENTERED')
	

	#Update report submission time
	gameid_range = '2018 Game Information!A2:A'

	range = '2018 Game Information'
	response = service.get_spreadsheet_values(spreadsheet_id, range)
	game_row_number = -1
  	response.values.each_with_index do |row, index|
		if row[0] == payload['gameID']
			puts "Updating game " + index.to_s
			range_name = "2018 Game Information!H" + (index+1).to_s + ":H" + (index+1).to_s
			value_range_object = Google::Apis::SheetsV4::ValueRange.new(range: range_name, values: [[Time.now.to_s]])		
	        result = service.update_spreadsheet_value(spreadsheet_id, range_name, value_range_object, value_input_option: 'USER_ENTERED')	
		end
	end

  	"200"
end

get '/api/test' do
	http_response = ''
	spreadsheet_id = SPREADSHEET_ID
	range = '2018 Fouls'
	response = service.get_spreadsheet_values(spreadsheet_id, range)
	puts 'Name, Major:'
	puts response.values.count
	puts 'No data found.' if response.values.empty?
	response.values.each do |row|
  		# Print columns A and E, which correspond to indices 0 and 4.
  		http_response += "#{row[0]}, #{row[4]}" + "\n"
	end
	return http_response
end


get '/api/' do
  "Hello World!"
end
