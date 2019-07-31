/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 0
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 14,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 14,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const fouls = [
  { label: 'BAT - Illegal Bat Of Football' },
{ label: 'ITK - Illegal Touch of Kick' },
{ label: 'BBW - Block Below The Waist' },
{ label: 'ITP - Illegal Touching of Forward Pass' },
{ label: 'BOB - Blocking Opponent While Out of Bounds' },
{ label: 'IWG - Illegal Wedge on Free Kick' },
{ label: 'CHB - Chop Block' },
{ label: 'KCI - Kick Catch Interference' },
{ label: 'KIK - Illegal Kick' },
{ label: 'CLP - Clipping' },
{ label: 'KOB - Free Kick Out of Bounds' },
{ label: 'LEA - Leaping' },
{ label: 'LEV - Leverage By Defensive Player' },
{ label: 'DH - Holding By Defense' },
{ label: 'LPS - Defense Leaps Over Shield On Punt' },
{ label: 'DOD - Delay of Game By Defense' },
{ label: 'OFK - Offside on Free Kick' },
{ label: 'DOF - Offside By Defense' },
{ label: 'OH - Holding By the Offense' },
{ label: 'DOG - Delay of Game By Offense' },
{ label: 'OPI - Pass Interference by Offense' },
{ label: 'DPI - Pass Interference by Defense' },
{ label: 'PFH - Personal Foul Helmet Came Off During Down' },
{ label: 'DSC - Disconcerting Signals By Defense Prior To Snap' },
{ label: 'RFH - Personal Foul For Roughing Holder (15 Yards)' },
{ label: 'ENC - Encroachment Offense' },
{ label: 'RFK - Personal Foul For Roughing Kicker Free Kick (15 Yards)' },
{ label: 'EQV - Equipment Violation' },
{ label: 'RNH - Running into Holder (non personal foul - 5 Yards)' },
{ label: 'RNK - Running Into Kicker (non personal foul - 5 Yards)' },
{ label: 'FBG - Fighting Before Game ' },
{ label: 'ROB - Player Returns From Out of Bounds and Participates' },
{ label: 'FFH - Fighting During First Half' },
{ label: 'RPS - Personal Foul Roughing Passer' },
{ label: 'RRK - Personal Foul For Roughing Kicker (scrimmage kick)' },
{ label: 'FMM - Personal Foul Face Mask Major (15 yards)' },
{ label: 'SKE - Personal Foul For Striking, Kicking, Kneeing. Elbowing' },
{ label: 'SLW - Sideline Warning' },
{ label: 'FST - False Start' },
{ label: 'TGT - Personal Foul For Targeting' },
{ label: 'TRP - Personal Foul For Tripping' },
{ label: 'GAI - Game Administration Interference' },
{ label: 'GAM - Game Administration Interference Major (15 yards)' },
{ label: 'HUR - Personal Foul For Hurdling' },
{ label: 'IBB - Illegal Block In Back' },
{ label: 'IBK - Illegal Block on Kick' },
{ label: 'ICS - Personal Foul For Illegal Contact with Snapper' },
{ label: 'IDP - Ineligible Offensive Players Downfield Before Pass' },
{ label: 'IFD - Illegal Formation Defense' },
{ label: 'IFK - Illegal Free Kick Formation' },
{ label: 'IHR - Illegally Helping Runner' },
{ label: 'IKB - Ilegally Kicking Loose Ball' },
{ label: 'ILF - Illegal Formation' },
{ label: 'ILH - Illegal Hands' },
{ label: 'ILS - Illegal Substitution' },
{ label: 'ING - Intentional Grounding of Forward Pass' },
{ label: 'SH - Illegal Shift by Offense' },
{ label: 'ISP - Illegal Snap' },
{ label: 'UNR/BTH - Personal Foul for Blow to Head of Opponent' },
{ label: 'UNR/HCT - Personal Foul For Horse Collar Tackle' },
{ label: 'UNR/HDP - Personal Foul For Hit Against Defenseless Player' },
{ label: 'UNR/HTF - Personal Foul For Hands to Face Of Opponent' },
{ label: 'UNR/LTO - Personal Foul For Late Hit Out of Bounds' },
{ label: 'UNR/LTP - Personal Foul For Late  Hit/Piling On' },
{ label: 'UNR/OTH - Personal Foul For Unnecessary Roughness' },
{ value: 'UNS/ABL - Unsportsmanlike Act For Abusive Language', label: 'UNS/ABL - Unsportsmanlike Act For Abusive Language' },
{ label: 'UNS/BCH - Unsportsmanlike Act/Bench' },
{ label: 'UNS/DEA - Unsportsmanlike Act For Delayed or Excessive Act' },
{ label: 'UNS/GAI - Unsportsmanlike Act Game Administration Interference' },
{ label: 'UNS/LEV - Unsportsmanlike Act Defense Using Leverage' },
{ label: 'UNS/NFA - Unsportsmanlike Act For NonFootball Action' },
{ label: 'UNS/OTH - Other Unsportsmanlike Action' },
{ label: 'UNS/RHT - Unsportsmanlike Act For Removing Helmet' },
{ label: 'UNS/STB - Unsportsmanlike Act For Spiking or Throwing Ball' },
{ label: 'UNS/TAU - Unsportsmanlike Act For Taunting or Baiting Opponent' },
{ label: 'UNS/UFA - Unsportsmanlike Act For Unfair Action' }
].map(foul => ({
  value: foul.label,
  label: foul.label,
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      rowsMax={1}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontSize: 14,
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};


class FoulList extends React.Component {
  state = {
    single: null,
    multi: null,
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            onChange={(event) => this.props.handleUpdateChange(event, this.props.rowId)}
            classes={classes}
            styles={selectStyles}
            options={fouls}
            value={fouls.find((foul) => foul.label === this.props.value)}
            components={components}
            isClearable

          />
        </NoSsr>
      </div>
    );
  }
}

FoulList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FoulList);
