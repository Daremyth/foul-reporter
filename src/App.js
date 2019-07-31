import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Header from './header.js'
import Games from './games.js';
import Grid from '@material-ui/core/Grid';
import FoulList from './foulDrop.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const testData = '{"open":false,"confirmopen":false,"submitting":false,"error":false,"referee":"R. Cashion","umpire":"J. Keck","headLinesman":"P. Weidner","lineJudge":"D. Orem","fieldJudge":"D. Hakes","sideJudge":"B. Carollo","backJudge":"D. Creed","site":"Sun Devil Stadium","date":"1/28/1996","startTime":"","endTime":"","homeTeam":"Dallas Cowboys","visitorTeam":"Pittsburgh Steelers","homeHalfScore":"","visitorHalfScore":"","homeOTScore":"","visitorOTScore":"","homeFinalScore":"","visitorFinalScore":"","gameID":"100","rows":[{"quarter":1,"id":0,"team":"H","unit":"O","choice":"A","officials":["R","U"],"time":"5:32","foul":"OH - Holding By the Offense","comments":"Grab and restrict","number":"34"},{"quarter":"2","id":1,"team":"H","unit":"D","choice":"D","officials":["F","B"],"time":"12:32","foul":"DPI - Pass Interference by Defense","comments":"Not playing the ball","number":"99"},{"quarter":"3","id":2,"team":"V","unit":"O","choice":"A","officials":["B"],"time":":34","foul":"DOG - Delay of Game By Offense","number":"7"},{"quarter":"4","id":3,"team":"V","unit":"O","choice":"A","officials":["H","L"],"time":"6:32","foul":"FST - False Start"}]}'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

var games = Games.data;
console.log(Games.data[0]);
const styles = theme => ({
  root: {
    width: "90%",
    marginTop: theme.spacing.unit,
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  },
  cells: {
    borderRight: '1px solid #000000'
  }
});

let currentQuarter=1;
let id = -1;
function createData() {
  id += 1;
  var entry = {}
  entry.quarter = currentQuarter;
  entry.id = id;
  entry.team = 'H';
  entry.unit = 'O';
  entry.choice = 'A';
  entry.officials = [];
  return entry;
}


const positions = [
  'R','U','H','L','F','S','B'
];

const divStyle = {
  margin: '50px',
  width: '95%'
};


const smallTextFieldStyle = {
  marginLeft: 20,
  marginRight: 20,
  width: 100
}

const textFieldStyle = {
  marginLeft: 20,
  marginRight: 20,
  width: 200
}

const scoreFieldStyle = {
  width: 10
}


class SimpleTable extends React.Component {

  componentDidMount() {
    document.title ="Online foul report";
  }
  constructor(props) {
    super(props);
    this.handleOfficialChange = this.handleOfficialChange.bind(this);
    this.loadGameInfo = this.loadGameInfo.bind(this);
    
    this.state = {
      open: false,
      confirmopen: false,
      submitting: false,
      error: false,
      referee: '',
      umpire: '',
      headLinesman: '',
      lineJudge: '',
      fieldJudge: '',
      sideJudge: '',
      backJudge: '',
      site: '',
      date: '',
      startTime: '',
      endTime: '',
      homeTeam: '',
      visitorTeam: '',
      homeHalfScore: '',
      visitorHalfScore: '',
      homeOTScore: '',
      visitorOTScore: '',
      homeFinalScore: '',
      visitorFinalScore: '',        
      gameID: '',
      rows : [
        createData()
      ]
    }
  }

  reindex(rows) {
    for(var i=0; i<rows.length; i++) {
      rows[i].id=i;
    }
    id=i;
    return rows;
  }

  removeRow(row) {
    var rows = this.state.rows;
    console.log("Killing row " + row.id);
    rows.splice(row.id, 1);
    rows = this.reindex(rows);
    this.setState({rows: rows});
    id-=1;
  }

  addRow() {
    var rows = this.state.rows;
    rows.push(createData());
    this.setState({rows: rows});
  }

  submitReport(confirm) {
    var rows = this.state.rows;
    var success;
    console.log(JSON.stringify(this.state));
    return;
    this.setState({ submitting: true, confirmopen: false });
    var uri = '/api/storereport';
    console.log(confirm)
    if(confirm == true) {
      uri = uri+'?override=true'
    }
    fetch(uri, {
      method: 'post',
      body: JSON.stringify(this.state)
    }).then(response => {
      if(response.status == 400)
        this.setState({ confirmopen: true, submitting: false })
      else 
        this.setState({ open: true, submitting: false })
    }
    ).catch(error => {
      console.log(error);
      this.setState({ error: true, submitting: false })
    }
    )
    
  }

  handleConfirm = () => {
    this.submitReport(true);
  };

  handleClose = () => {
    this.setState({ open: false, confirmopen: false, submitting: false, error: false});
  };

  handleChange(row, event, field) {
    console.log(row.id);
    if(field=='quarter')  {
      currentQuarter = event.target.value;
    }

    var rows = this.state.rows;
    rows[row.id][field] = event.target.value;
    console.log(rows[row.id][field]);
    this.setState({rows: rows});
  }

  handleUpdateChange(e, rowId) {  
    if(e!=null) {
      var rows = this.state.rows;
      rows[rowId]['foul'] = e.value;
      this.setState({rows: rows});
      console.log(e.value);
      console.log(rowId);
    }
  }

  handleOfficialChange(event, official) {
    console.log(event.target.value);
    this.setState({[official]: event.target.value});
  }

  loadGameInfo(e) {
    console.log(e.target.value);
    if(e.target.value.length==3) {
      for (var i=0; i<games.length; i++) {
        if(games[i]['id'] === e.target.value) {
          console.log(games[i]);
          this.setState({referee: games[i]['r'],
            umpire: games[i]['u'],
            headLinesman: games[i]['h'],
            lineJudge: games[i]['l'],
            sideJudge: games[i]['s'],
            fieldJudge: games[i]['f'],
            backJudge: games[i]['b'],
            homeTeam: games[i]['home'],
            visitorTeam: games[i]['visitor'],
            site: games[i]['site'],
            date: games[i]['date'],
            gameID: e.target.value
          });
        }
      }
    }
  }

  loadGame(e) {
    var data = JSON.parse(testData);
    console.log(this.state.gameID);
    console.log(data);
    this.setState({rows: data.rows})
    for (var i=0; i<data.rows.length; i++) {
      console.log(data.rows[i]);
    }
  }

  render() {
    return (
      <div>
        <Header/>
        
        <Paper style={{ margin: 20 }}>
        <Grid>
          <TextField style={smallTextFieldStyle}
            margin="normal"
            label="Game ID"
            onChange={(event) => this.loadGameInfo(event)}
          />
          <Button variant="outlined" 
                size="small" 
                margin="normal"
                color="primary" 
                style={{ maxWidth: 400 , margin: '25px 10px 10px'}}
                onClick = {() => this.loadGame()}>
            Load game
          </Button>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Paper style={{marginLeft: 20}}>
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Site"
                  onChange={(event) => this.handleOfficialChange(event, 'site')}
                  value={this.state.site}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Date"
                  onChange={(event) => this.handleOfficialChange(event, 'date')}
                  value={this.state.date}
                />
                <Grid container>
                  <Grid item xs={6}>
                    <TextField style={smallTextFieldStyle}
                      margin="normal"
                      label="Start time"
                      onChange={(event) => this.handleOfficialChange(event, 'startTime')}
                      value={this.state.startTime}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField style={smallTextFieldStyle}
                      margin="normal"
                      label="End time"
                      onChange={(event) => this.handleOfficialChange(event, 'endTime')}
                      value={this.state.endTime}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Table padding='checkbox'>
                  <TableHead>
                    <TableRow padding={'none'}>
                      <TableCell width={'50%'}></TableCell>
                      <TableCell align="right">Half</TableCell>
                      <TableCell align="right">OT</TableCell>
                      <TableCell align="right">Final</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow padding={'none'}>
                      <TableCell component="th" scope="row">
                        <TextField
                          style={{marginBottom: 12}}
                          label="Home"
                          onChange={(event) => this.handleOfficialChange(event, 'homeTeam')}
                          value={this.state.homeTeam}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField width={10} style={{scoreFieldStyle}} 
                          onChange={(event) => this.handleOfficialChange(event, 'homeHalfScore')}
                          value={this.state.homeHalfScore}/>
                      </TableCell>
                      <TableCell align="right">
                        <TextField style={{scoreFieldStyle}}
                          onChange={(event) => this.handleOfficialChange(event, 'homeOTScore')}
                          value={this.state.homeOTScore}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField style={{scoreFieldStyle}}
                          onChange={(event) => this.handleOfficialChange(event, 'homeFinalScore')}
                          value={this.state.homeFinalScore}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow padding={'none'}>
                      <TableCell component="th" scope="row">
                        <TextField
                          style={{marginBottom: 12}}
                          label="Visitor"
                          onChange={(event) => this.handleOfficialChange(event, 'visitorTeam')}
                          value={this.state.visitorTeam}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField width={10} style={{scoreFieldStyle}} 
                          onChange={(event) => this.handleOfficialChange(event, 'visitorHalfScore')}
                          value={this.state.visitorHalfScore}/>
                      </TableCell>
                      <TableCell align="right">
                        <TextField style={{scoreFieldStyle}}
                          onChange={(event) => this.handleOfficialChange(event, 'visitorOTScore')}
                          value={this.state.visitorOTScore}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField style={{scoreFieldStyle}}
                          onChange={(event) => this.handleOfficialChange(event, 'visitorFinalScore')}
                          value={this.state.visitorFinalScore}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{marginRight: 20}}>
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Referee"
                  onChange={(event) => this.handleOfficialChange(event, 'referee')}
                  value={this.state.referee}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Umpire"
                  onChange={(event) => this.handleOfficialChange(event, 'umpire')}
                  value={this.state.umpire}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Head Linesman"
                  onChange={(event) => this.handleOfficialChange(event, 'headLinesman')}
                  value={this.state.headLinesman}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Line Judge"
                  onChange={(event) => this.handleOfficialChange(event, 'lineJudge')}
                  value={this.state.lineJudge}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Side Judge"
                  onChange={(event) => this.handleOfficialChange(event, 'sideJudge')}
                  value={this.state.sideJudge}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Field Judge"
                  onChange={(event) => this.handleOfficialChange(event, 'fieldJudge')}
                  value={this.state.fieldJudge}
                />
                <TextField style={textFieldStyle}
                  margin="normal"
                  label="Back Judge"
                  onChange={(event) => this.handleOfficialChange(event, 'backJudge')}
                  value={this.state.backJudge}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={this.props.root} style={{ margin: 20 }}>
          <Table className={this.props.table} >
            <TableHead>
              <TableRow>
                <TableCell>Quarter</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Foul</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Player number(s)</TableCell>
                <TableCell>Choice</TableCell>
                <TableCell>Calling Official</TableCell>
                <TableCell>HUDL play (optional)</TableCell>
                <TableCell>Delete row</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell style={{borderRight: "1px solid grey"}} padding="dense">
                    <Select
                      native
                      onChange={(event) => this.handleChange(row, event, 'quarter')}
                      inputProps={{
                        value: row.quarter,
                        name: 'quarter',
                        id: 'quarter-simple',
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </Select>
                  </TableCell>
                  <TableCell style={{width: "10%", borderRight: "1px solid grey"}} padding="dense">
                    <TextField
                      id="standard-time"
                      onChange={(event) => this.handleChange(row, event, 'time')}
                      inputProps={{
                        value: row.time || ''
                      }}
                    />
                  </TableCell>
                  <TableCell padding="dense" style={{borderRight: "1px solid grey"}}>
                    <Select style={{margin: 'none'}}
                      native
                      onChange={(event) => this.handleChange(row, event, 'team')}
                      displayEmpty
                      inputProps={{
                        value: row.team,
                        name: 'team',
                        id: 'team-simple',
                      }}
                    >
                      <option value={'H'}>H</option>
                      <option value={'V'}>V</option>
                    </Select>
                  </TableCell>
                  <TableCell style={{width: "60%", borderRight: "1px solid grey"}} padding="dense">
                    <FoulList 
                      handleUpdateChange={this.handleUpdateChange.bind(this)}
                      rowId={row.id} 
                      value = {row.foul}
                    >
                    </FoulList>
                  </TableCell>
                  <TableCell style={{width: "20%", borderRight: "1px solid grey"}} padding="dense">
                    <TextField
                      fullWidth={true}
                      id="standard-comments"
                      onChange={(event) => this.handleChange(row, event, 'comments')}
                      inputProps={{
                        value: row.comments || ''
                      }}
                    />
                  </TableCell>
                  <TableCell style={{borderRight: "1px solid grey"}} padding="dense">
                    <Select
                      native
                      onChange={(event) => this.handleChange(row, event, 'unit')}
                      displayEmpty
                      inputProps={{
                        value: row.unit,
                        name: 'team',
                        id: 'team-simple',
                      }}
                    >
                      <option value={'O'}>O</option>
                      <option value={'D'}>D</option>
                      <option value={'K'}>K</option>
                      <option value={'R'}>R</option>
                    </Select>
                  </TableCell>
                  <TableCell style={{width: "10%", borderRight: "1px solid grey"}} padding="dense">
                    <TextField
                      id="standard-number"
                      onChange={(event) => this.handleChange(row, event, 'number')}
                      inputProps={{
                        value: row.number || ''
                      }}
                    />
                  </TableCell>
                  <TableCell style={{borderRight: "1px solid grey"}} padding="dense">
                    <Select
                      native
                      onChange={(event) => this.handleChange(row, event, 'choice')}
                      displayEmpty
                      inputProps={{
                        value: row.choice,
                        name: 'choice',
                        id: 'choice-simple',
                      }}
                    >
                      <option value={'A'}>A</option>
                      <option value={'D'}>D</option>
                      <option value={'O'}>O</option>
                    </Select>
                  </TableCell>
                  <TableCell style={{width: "20%", borderRight: "1px solid grey"}} padding="dense">
                    <Select
                     multiple
                     fullWidth={true}
                     value={row.officials}
                     onChange={(event) => this.handleChange(row, event, 'officials')}
                     input={<Input id="select-multiple-chip" />}
                     renderValue={selected => (
                       <div>
                         {selected.map(value => (
                           <Chip key={value} label={value}/>
                         ))}
                       </div>
                       )}
                     MenuProps={MenuProps}
                     >
                     {positions.map(position => (
                       <MenuItem key={position} value={position}>
                         {position}
                       </MenuItem>
                     ))}
                    </Select>
                  </TableCell>
                  <TableCell style={{width: "10%", borderRight: "1px solid grey"}} padding="dense">
                    <TextField
                      id="standard-hudl"
                      onChange={(event) => this.handleChange(row, event, 'hudl')}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => this.removeRow(row)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outlined" 
                size="small" 
                color="primary" 
                style={{ maxWidth: 400, margin: '10px 10px 10px' }}
                onClick = {() => this.addRow()}>
            Add row
          </Button>
          <Button variant="outlined" 
                size="small" 
                color="primary" 
                style={{ maxWidth: 400, margin: '10px 10px 10px' }}
                onClick = {() => this.submitReport()}>
            Submit
          </Button>
          
          <Dialog
            open={this.state.submitting}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Submitting report..."}</DialogTitle>
        </Dialog>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Report submitted"}</DialogTitle>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Great!
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.error}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Error submitting report"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We had a problem submitting your foul report.  Please try again.  If this problem persists, contact the webmaster.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Bummer.
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.confirmopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Overwrite existing report?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              A report for this game has already been submitted. Are you sure you want to overwrite the previous report?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              Overwrite 
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel 
            </Button>
          </DialogActions>
        </Dialog>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleTable);
