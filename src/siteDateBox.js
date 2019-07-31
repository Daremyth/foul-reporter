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

const textFieldStyle = {
  marginLeft: 20,
  marginRight: 20,
  width: 200
}

const smallTextFieldStyle = {
  marginLeft: 20,
  marginRight: 20,
  width: 100
}

class SiteDateBox extends React.Component {
  render() {
    return (
      <Paper style={{marginLeft: 20}}>
        <TextField style={textFieldStyle}
  		    margin="normal"
  		    label="Site"
        />
        <TextField style={textFieldStyle}
          margin="normal"
          label="Date"
        />
        <Grid container>
          <Grid item xs={6}>
            <TextField style={smallTextFieldStyle}
              margin="normal"
              label="Start time"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField style={smallTextFieldStyle}
              margin="normal"
              label="End time"
            />
          </Grid>
        </Grid>
  	 </Paper>
    )
  }
}

export default SiteDateBox;