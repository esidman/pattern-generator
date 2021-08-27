import React, { useState } from "react";
// import Paper,{Path} from './lib/paperjs/dist/paper-full.js';
import Paper, {
  Path,
  Point,
  PaperScope,
  paper,
  project,
  Tool,
  activeLayer,
} from "paper";
import { useProjectContext } from "../Context/ProjectContext";
import { Layer } from "paper/dist/paper-core";
let tool = new Tool();

const Canvas = (props) => {
  const [projectState, projectDispatch] = useProjectContext();

  React.useEffect(() => {
    tool.onMouseDrag = projectState.drawShape;
  }, [projectState.drawShape]);

  //Clears canvas on mouse click
  const handleMouseDown = (event) => {
    // project.clear();
    let oldLayer = new paper.Layer();
    oldLayer.insertBelow(activeLayer);
  };

  return (
    <canvas
      id="paper-canvas"
      width="100%"
      height="100%"
      onMouseDown={handleMouseDown}
      data-paper-resize
    />
  );
};

export default Canvas;
