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

class ScoreBox extends React.Component {
	render() {
		return (
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
								/>
							</TableCell>
							<TableCell align="right"><TextField width={10} style={{scoreFieldStyle}}/></TableCell>
							<TableCell align="right"><TextField style={{scoreFieldStyle}}/></TableCell>
							<TableCell align="right"><TextField style={{scoreFieldStyle}}/></TableCell>
						</TableRow>
						<TableRow padding={'none'}>
							<TableCell component="th" scope="row">
								<TextField
									style={{marginBottom: 12}}
									label="Visitor"
								/>
							</TableCell>
							<TableCell align="right"><TextField style={{scoreFieldStyle}}/></TableCell>
							<TableCell align="right"><TextField style={{scoreFieldStyle}}/></TableCell>
							<TableCell align="right"><TextField style={{scoreFieldStyle}}/></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>
			)

	}
}
	export default withStyles(styles)(ScoreBox);