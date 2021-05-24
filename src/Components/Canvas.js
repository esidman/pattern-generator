import React, { useState } from "react";
// import Paper,{Path} from './lib/paperjs/dist/paper-full.js';
import Paper, { Path, Point, PaperScope, project, Tool } from "paper";
import { useProjectContext } from "../Context/ProjectContext";
let tool = new Tool();

const Canvas = (props) => {
  const [projectState, projectDispatch] = useProjectContext();

  React.useEffect(() => {
    tool.onMouseDrag = projectState.drawShape;
  }, [projectState.drawShape]);

  //Clears canvas on mouse click
  const handleMouseDown = (event) => {
    project.clear();
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
