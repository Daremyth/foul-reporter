require 'json'

file = open("games.json")
json = file.read
parsed = JSON.parse(json)

parsed.each_with_index do |game, index|
	parsed[index]["r"] = game["r"].split.map(&:capitalize).join(' ')
	parsed[index]["r"] = game["r"].split[0][0] + ". " + game["r"].split[1..].join(' ')

	parsed[index]["u"] = game["u"].split.map(&:capitalize).join(' ')
	parsed[index]["u"] = game["u"].split[0][0] + ". " + game["u"].split[1..].join(' ')

	parsed[index]["h"] = game["h"].split.map(&:capitalize).join(' ')
	parsed[index]["h"] = game["h"].split[0][0] + ". " + game["h"].split[1..].join(' ')

	parsed[index]["l"] = game["l"].split.map(&:capitalize).join(' ')
	parsed[index]["l"] = game["l"].split[0][0] + ". " + game["l"].split[1..].join(' ')

	parsed[index]["f"] = game["f"].split.map(&:capitalize).join(' ')
	parsed[index]["f"] = game["f"].split[0][0] + ". " + game["f"].split[1..].join(' ')

	parsed[index]["s"] = game["s"].split.map(&:capitalize).join(' ')
	parsed[index]["s"] = game["s"].split[0][0] + ". " + game["s"].split[1..].join(' ')

	parsed[index]["b"] = game["b"].split.map(&:capitalize).join(' ')
	parsed[index]["b"] = game["b"].split[0][0] + ". " + game["b"].split[1..].join(' ')
end

puts JSON.pretty_generate(parsed)
