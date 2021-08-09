import { useContext, createContext, useReducer, useEffect } from "react";
import { Path, Point, project, activeLayer } from "paper";
import { Layer, projects } from "paper/dist/paper-core";
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
    case "SET_PATTERN_COLOR":
      return {
        ...state,
        patternColor: action.payload,
      };
    case "SET_SPACING_VALUE":
      return {
        ...state,
        spacingValue: action.payload,
      };
    case "SET_SIZE_VALUE":
      return {
        ...state,
        sizeValue: action.payload,
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
    var w = projectState.spacingValue;
    var size = projectState.sizeValue;

    // Draws pattern
    if (x2 < x1 && y2 < y1) {
      for (var x = x1; x >= x2; x -= w) {
        for (var y = y1; y >= y2; y -= w) {
          new Path.Circle(new Point(x, y), size).fillColor =
            projectState.patternColor;
        }
      }
    }

    if (x2 > x1 && y2 < y1) {
      for (var x = x1; x <= x2; x += w) {
        for (var y = y1; y >= y2; y -= w) {
          new Path.Circle(new Point(x, y), size).fillColor =
            projectState.patternColor;
        }
      }
    }

    if (x2 < x1 && y2 > y1) {
      for (var x = x1; x >= x2; x -= w) {
        for (var y = y1; y <= y2; y += w) {
          new Path.Circle(new Point(x, y), size).fillColor =
            projectState.patternColor;
        }
      }
    }

    if (x2 > x1 && y2 > y1) {
      for (var x = x1; x <= x2; x += w) {
        for (var y = y1; y <= y2; y += w) {
          new Path.Circle(new Point(x, y), size).fillColor =
            projectState.patternColor;
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
    var w = projectState.spacingValue;
    var h = projectState.spacingValue;
    var size = projectState.sizeValue;
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
        new Path.Circle(new Point(x, y), size).fillColor =
          projectState.patternColor;
        console.log(projectState.patternColor);
      }
    }
    for (var y = 0; y <= 10000; y += h) {
      for (
        var x = x1 - w;
        x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
        x -= w
      ) {
        new Path.Circle(new Point(x, y), size).fillColor =
          projectState.patternColor;
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
    var w = projectState.spacingValue;
    var size = projectState.sizeValue;

    // Draws pattern
    if (y2 > y1) {
      for (var y = y1; y <= y2; y += (Math.sqrt(3) / 2) * w) {
        for (
          var x = (-1 / Math.sqrt(3)) * y + x1 + (1 / Math.sqrt(3)) * y1;
          x <= (1 / Math.sqrt(3)) * y + x1 - 0.578 * y1;
          x += w
        ) {
          new Path.Circle(new Point(x, y), size).fillColor =
            projectState.patternColor;
        }
      }
    }

    if (y2 < y1) {
      for (var y = y1; y >= y2; y -= (Math.sqrt(3) / 2) * w) {
        for (
          var x = (1 / Math.sqrt(3)) * y + x1 - (1 / Math.sqrt(3)) * y1;
          x <= (-1 / Math.sqrt(3)) * y + x1 + 0.578 * y1;
          x += w
        ) {
          new Path.Circle(new Point(x, y), size).fillColor =
            projectState.patternColor;
        }
      }
    }
  };

  const value = {
    shapeType: "square",
    drawShape: squareShape,
    patternType: "circle-pattern",
    patternColor: "#D3AD44",
    spacingValue: 30,
    sizeValue: 3,
  };
  const [projectState, projectDispatch] = useReducer(reducer, value);

  useEffect(
    () => {
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
    },
    // useEffect dependency
    [
      projectState.shapeType,
      projectState.patternColor,
      projectState.spacingValue,
      projectState.sizeValue,
    ]
  );

  return (
    <ProjectContext.Provider value={[projectState, projectDispatch]}>
      {children}
    </ProjectContext.Provider>
  );
}
