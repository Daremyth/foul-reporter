import React from 'react';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import ScoreBox from './scoreBox.js';
import OfficialsBox from './officialsBox.js';
import SiteDateBox from './siteDateBox.js';
import FoulTable from './foulTable.js'

const divStyle = {
	margin: '50px',
	width: '95%'
};


const smallTextFieldStyle = {
	marginLeft: 20,
	marginRight: 20,
	width: 100
}

var referee;

class GameInfoBox extends React.Component {
	constructor(props) {
		super(props);
	}

	loadGameInfo(e) {
    console.log(e.target.value);
    if(e.target.value.length==3) {
      for (var i=0; i<this.props.games.length; i++) {
        if(this.props.games[i]['id'] === e.target.value) {
          console.log(this.props.games[i]['r']);
          var state = this.state;

          state.referee=this.props.games[i]['r'];
          this.setState(state);

        }
      }
    }
  }
  // Import result is the URL of your image
  render() {
  return (
  	<Paper style={{ margin: 20 }}>
  		<TextField style={smallTextFieldStyle}
	  		margin="normal"
  			label="Game ID"
  			onChange={(event) => this.props.loadGameInfo(event)}
  		/>
  		<Grid container spacing={24}>
  			<Grid item xs={3}>
		  		<SiteDateBox/>
	  		</Grid>
	  		<Grid item xs={3}>
	  			<ScoreBox/>
  			</Grid>
  			<Grid item xs={6}>
		  		<OfficialsBox
		  		referee={this.props.gameInfo.referee}/>
	  		</Grid>
  		</Grid>
  	</Paper>
  	);
}}

export default GameInfoBox;