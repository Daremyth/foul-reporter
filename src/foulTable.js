import React from 'react';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import FoulList from './foulDrop.js'
import { withStyles } from "@material-ui/core/styles";


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

const positions = [
  'R','U','H','L','F','S','B'
];

const styles = theme => ({
  root: {
    width: "90%",
    marginTop: theme.spacing.unit,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
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
  entry.team = '';
  entry.unit = '';
  entry.choice = '';
  entry.officials = [];
  return entry;
}


class FoulTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows : [
        createData()
      ]
    }
    this.gameinfo = {
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
      referee: '',
      umpire: '',
      headLinesman: '',
      lineJudge: '',
      fieldJudge: '',
      sideJudge: '',
      backJudge: '',
      gameID: ''
    }
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

  render() {
    return (
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
                    placeholder="mm:ss"
                    id="standard-time"
                    onChange={(event) => this.handleChange(row, event, 'time')}
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
                  >
                  </FoulList>
                </TableCell>
                <TableCell style={{width: "20%", borderRight: "1px solid grey"}} padding="dense">
                  <TextField
                    fullWidth={true}
                    id="standard-comments"
                    onChange={(event) => this.handleChange(row, event, 'comments')}
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
                    onChange={(event) => this.handleChange(row, event, 'time')}
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
        

      )
  }
}

export default withStyles(styles)(FoulTable);