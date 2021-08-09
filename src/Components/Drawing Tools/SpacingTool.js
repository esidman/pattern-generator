import React from "react";
import { useProjectContext } from "../../Context/ProjectContext";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: 232,
  },
  input: {
    width: 48,
    fontFamily: "Apercu Mono Pro",
    color: "#8A124D",
    background: "white",
    border: "1px solid",
    borderRadius: "3px",
    paddingLeft: "12px",
  },
});

const marks = [
  {
    value: 0,
  },
  {
    value: 100,
  },
];

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const SpacingSlider = withStyles({
  root: {
    color: "#8A124D",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: "#8A124D",
    // boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#8A124D",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#8A124D",
  },
  mark: {
    backgroundColor: "#8A124D",
    height: 12,
    width: 2,
    marginTop: -5,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

const SpacingTool = () => {
  const [projectState, projectDispatch] = useProjectContext();
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    dispatchValue(newValue);
  };

  const handleInputChange = (event) => {
    dispatchValue(Math.abs(event.target.value));
  };

  const dispatchValue = (newValue) => {
    projectDispatch({
      type: "SET_SPACING_VALUE",
      payload: newValue,
    });
  };

  return (
    <div className="Drawing-tools">
      <div className="tool-name">Spacing</div>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <SpacingSlider
              value={projectState.spacingValue}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              marks={marks}
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.input}
              value={projectState.spacingValue}
              margin="dense"
              onChange={handleInputChange}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SpacingTool;
