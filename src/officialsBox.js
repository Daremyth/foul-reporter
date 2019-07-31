import React from 'react';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const scoreFieldStyle = {
	width: 10
}

const textFieldStyle = {
	marginLeft: 20,
	marginRight: 20,
	width: 200
}


class OfficialsBox extends React.Component {
	render() {
		return (
			<Paper style={{marginRight: 20}}>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Referee"
  					value={this.props.referee}
  				/>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Umpire"
  				/>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Head Linesman"
  				/>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Line Judge"
  				/>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Side Judge"
  				/>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Field Judge"
  				/>
  				<TextField style={textFieldStyle}
  					margin="normal"
  					label="Back Judge"
  				/>
  			</Paper>
		)

	}
}
	export default (OfficialsBox);