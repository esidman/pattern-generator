import classNames from "classnames";
import React from "react";
import { useProjectContext } from "../../Context/ProjectContext";
import ColorPicker from "../ColorPicker";

const PatternColorTool = () => {
  const [projectState, projectDispatch] = useProjectContext();

  // const isPatternColorSelected = (color) => {
  //   return projectState.patternColor === color;
  // };

  return (
    <div className="Drawing-tools">
      <div className="tool-name">Pattern Color</div>
      <ColorPicker colorPickerType="SET_PATTERN_COLOR" />
    </div>
  );
};

export default PatternColorTool;
