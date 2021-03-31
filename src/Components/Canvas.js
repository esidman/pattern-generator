import React from "react";
// import Paper,{Path} from './lib/paperjs/dist/paper-full.js';
import Paper, { Path, Point, PaperScope, project, Tool } from "paper";

const Canvas = (props) => {
  console.log("paper", Paper);

  React.useEffect(() => {
    Paper.setup("paper-canvas");
    console.log("paper", Paper);
    let tool = new Tool();
    tool.onMouseDrag = function (event) {
      // console.log("event", event)
      // Refreshes canvas every frame (super important for performance!)
      project.clear();

      // Sets beginning and end points, and pattern spacing
      var x1 = event.downPoint.x;
      var y1 = event.downPoint.y;
      var x2 = event.point.x;
      var y2 = event.point.y;
      var w = 30;
      var h = 30;
      var point1 = new Point(x1, y1);
      var point2 = new Point(x1, y2);
      var r = point1.getDistance(point2);
      // console.log("beforeloop")
      // console.log("equation", r)
      // Draws pattern
      for (var y = 0; y <= y2; y += h) {
        // console.log("outerforloop")
        for (
          var x = x1;
          x <= Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
          x += w
        ) {
          // console.log("innerforloop")
          new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
        }
      }
      for (var y = 0; y <= y2; y += h) {
        for (
          var x = x1 - w;
          x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
          x -= w
        ) {
          new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
        }
      }
    };
  }, []);
  //Clears canvas on mouse click
  const handleMouseDown = (event) => {
    project.clear();
  };

  const handleMouseDrag = (event) => {};
  return <canvas id="paper-canvas" onMouseDown={handleMouseDown} />;
};
export default Canvas;
