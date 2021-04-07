import { useContext, createContext, useReducer, useEffect } from "react";
import { Path, Point, project } from "paper";
const ProjectContext = createContext();

export function useProjectContext() {
  return useContext(ProjectContext);
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SHAPE_TYPE":
      return {
        ...state,
        shapeType: action.payload,
      };
    case "SET_DRAW_SHAPE":
      return {
        ...state,
        drawShape: action.payload,
      };
    default:
      return state;
  }
};

export function ProjectProvider({ children }) {
  const squareShape = (event) => {
    console.log("drawingSquare");
    project.clear();

    // Sets beginning and end points, and pattern spacing
    var x1 = event.downPoint.x;
    var y1 = event.downPoint.y;
    var x2 = event.point.x;
    var y2 = event.point.y;
    var w = 30;

    // Draws pattern
    if (x2 < x1 && y2 < y1) {
      for (var x = x1; x >= x2; x -= w) {
        for (var y = y1; y >= y2; y -= w) {
          new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
        }
      }
    }

    if (x2 > x1 && y2 < y1) {
      for (var x = x1; x <= x2; x += w) {
        for (var y = y1; y >= y2; y -= w) {
          new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
        }
      }
    }

    if (x2 < x1 && y2 > y1) {
      for (var x = x1; x >= x2; x -= w) {
        for (var y = y1; y <= y2; y += w) {
          new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
        }
      }
    }

    if (x2 > x1 && y2 > y1) {
      for (var x = x1; x <= x2; x += w) {
        for (var y = y1; y <= y2; y += w) {
          new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
        }
      }
    }
  };
  const circleShape = (event) => {
    console.log("drawingCircle");
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
    for (var y = 0; y <= 10000; y += h) {
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
    for (var y = 0; y <= 10000; y += h) {
      for (
        var x = x1 - w;
        x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
        x -= w
      ) {
        new Path.Circle(new Point(x, y), 3).fillColor = "#8A124D";
      }
    }
  };
  const triangleShape = () => {};

  const value = {
    shapeType: "circle",
    drawShape: circleShape,
    patternType: "circle-pattern",
    patternColor: "#8A124D",
  };
  const [projectState, projectDispatch] = useReducer(reducer, value);

  useEffect(() => {
    console.log("shapeType", projectState.shapeType);
    if (projectState.shapeType === "square") {
      console.log("setting draw shape to square");
      projectDispatch({ type: "SET_DRAW_SHAPE", payload: squareShape });
    }
    if (projectState.shapeType === "circle") {
      console.log("dispatching circle shape");
      projectDispatch({ type: "SET_DRAW_SHAPE", payload: circleShape });
    }
    if (projectState.shapeType === "triangle") {
      projectDispatch({ type: "SET_DRAW_SHAPE", payload: triangleShape });
    }
  }, [projectState.shapeType]);
  useEffect(() => {
    console.log("changing draw shape", projectState);
  }, [projectState.drawShape]);
  return (
    <ProjectContext.Provider value={[projectState, projectDispatch]}>
      {children}
    </ProjectContext.Provider>
  );
}
