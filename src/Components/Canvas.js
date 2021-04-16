import React from "react";
// import Paper,{Path} from './lib/paperjs/dist/paper-full.js';
import Paper, { Path, Point, PaperScope, project, Tool } from "paper";
import { useProjectContext } from "../Context/ProjectContext";

const Canvas = (props) => {
  const [projectState, projectDispatch] = useProjectContext();
  console.log(projectState);

  React.useEffect(() => {
    Paper.setup("paper-canvas");
    // let tool = new Tool();
    // tool.onMouseDrag = projectState.drawShape;
    // tool.onMouseDrag = function (event) {
    //   // console.log("event", event)
    //   // Refreshes canvas every frame (super important for performance!)
    //   project.clear();

    //   // Sets beginning and end points, and pattern spacing
    //   var x1 = event.downPoint.x;
    //   var y1 = event.downPoint.y;
    //   var x2 = event.point.x;
    //   var y2 = event.point.y;
    //   var w = 30;
    //   var h = 30;
    //   var point1 = new Point(x1, y1);
    //   var point2 = new Point(x1, y2);
    //   var r = point1.getDistance(point2);
    //   // console.log("beforeloop")
    //   // console.log("equation", r)
    //   // Draws pattern
    //   for (var y = 0; y <= 10000; y += h) {
    //     // console.log("outerforloop")
    //     for (
    //       var x = x1;
    //       x <= Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
    //       x += w
    //     ) {
    //       // console.log("innerforloop")
    //       new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
    //     }
    //   }
    //   for (var y = 0; y <= 10000; y += h) {
    //     for (
    //       var x = x1 - w;
    //       x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
    //       x -= w
    //     ) {
    //       new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
    //     }
    //   }
    // };
  }, []);

  React.useEffect(() => {
    console.log("new useEffect", projectState);
    let tool = new Tool();
    tool.onMouseDrag = projectState.drawShape;
  }, [projectState.drawShape]);

  //Clears canvas on mouse click
  const handleMouseDown = (event) => {
    project.clear();
  };

  return (
    <canvas
      id="paper-canvas"
      onMouseDown={handleMouseDown}
      width="100%"
      height="100%"
      data-paper-resize
    />
  );
};

export default Canvas;
