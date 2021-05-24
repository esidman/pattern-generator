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

    // Draws pattern
    for (var y = 0; y <= 10000; y += h) {
      for (
        var x = x1;
        x <= Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
        x += w
      ) {
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
  const triangleShape = (event) => {
    // Refreshes canvas every frame (super important for performance!)
    project.clear();

    // Sets beginning and end points, and pattern spacing
    var x1 = event.downPoint.x;
    var y1 = event.downPoint.y;
    var x2 = event.point.x;
    var y2 = event.point.y;
    var w = 15;

    // Draws pattern
    if (y2 > y1) {
      for (var y = y1, i = 0; y <= y2; y += (w * Math.sqrt(3)) / 2, i++) {
        var patternShape = new Path.Line(
          new Point(x1 + (i * w) / 2, y),
          new Point(x1 - (y2 - y1) / Math.sqrt(3) + i * w, y2)
        );
        patternShape.strokeColor = "#8A124D";
        patternShape.strokeWidth = 1;
      }
    }

    if (y2 < y1) {
      for (var y = y1, i = 0; y >= y2; y -= (w * Math.sqrt(3)) / 2, i--) {
        var patternShape = new Path.Line(
          new Point(x1 + (i * w) / 2, y),
          new Point(x1 - (y2 - y1) / Math.sqrt(3) + i * w, y2)
        );
        patternShape.strokeColor = "#8A124D";
        patternShape.strokeWidth = 1;
      }
    }
  };

  const value = {
    shapeType: "circle",
    drawShape: circleShape,
    patternType: "circle-pattern",
    patternColor: "#8A124D",
  };
  const [projectState, projectDispatch] = useReducer(reducer, value);

  useEffect(() => {
    // // Paperjs event listener function that always runs
    if (projectState.shapeType === "square") {
      projectDispatch({ type: "SET_DRAW_SHAPE", payload: squareShape });
    }
    if (projectState.shapeType === "circle") {
      projectDispatch({ type: "SET_DRAW_SHAPE", payload: circleShape });
    }
    if (projectState.shapeType === "triangle") {
      projectDispatch({ type: "SET_DRAW_SHAPE", payload: triangleShape });
    }
  }, [projectState.shapeType]);

  return (
    <ProjectContext.Provider value={[projectState, projectDispatch]}>
      {children}
    </ProjectContext.Provider>
  );
}
