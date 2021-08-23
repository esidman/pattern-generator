import { useContext, createContext, useReducer, useEffect } from "react";
import {
  Path,
  Point,
  Rectangle,
  Circle,
  project,
  Group,
  activeLayer,
} from "paper";
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
    case "SET_PATTERN_TYPE":
      return {
        ...state,
        patternType: action.payload,
      };
    case "SET_DRAW_PATTERN":
      return {
        ...state,
        drawPattern: action.payload,
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
    case "SET_BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.payload,
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
    var i;
    var j = 32;

    // Draws Halftone
    if (projectState.patternType === "halftone-circles") {
      if (x2 < x1 && y2 < y1) {
        for (var y = y1, i = j; y >= y2; y -= w / 2, i--) {
          for (var x = x1; x >= x2; x -= w / 2) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      if (x2 > x1 && y2 < y1) {
        for (var y = y1, i = j; y >= y2; y -= w / 2, i--) {
          for (var x = x1; x <= x2; x += w / 2) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      if (x2 < x1 && y2 > y1) {
        for (var y = y1, i = j; y <= y2; y += w / 2, i--) {
          for (var x = x1; x >= x2; x -= w / 2) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      if (x2 > x1 && y2 > y1) {
        for (var y = y1, i = j; y <= y2; y += w / 2, i--) {
          for (var x = x1; x <= x2; x += w / 2) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      return;
    }

    // Draws solid shape
    if (projectState.patternType === "solid") {
      var rectangle = new Rectangle(new Point(x1, y1), new Point(x2, y2));
      var path = new Path.Rectangle(rectangle);
      path.fillColor = projectState.patternColor;
      return;
    }

    // Draws grid patterns
    if (x2 < x1 && y2 < y1) {
      for (var x = x1; x >= x2; x -= w) {
        for (var y = y1; y >= y2; y -= w) {
          projectState.drawPattern(x, y);
        }
      }
    }

    if (x2 > x1 && y2 < y1) {
      for (var x = x1; x <= x2; x += w) {
        for (var y = y1; y >= y2; y -= w) {
          projectState.drawPattern(x, y);
        }
      }
    }

    if (x2 < x1 && y2 > y1) {
      for (var x = x1; x >= x2; x -= w) {
        for (var y = y1; y <= y2; y += w) {
          projectState.drawPattern(x, y);
        }
      }
    }

    if (x2 > x1 && y2 > y1) {
      for (var x = x1; x <= x2; x += w) {
        for (var y = y1; y <= y2; y += w) {
          projectState.drawPattern(x, y);
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
    var j = 50;
    var i;
    var group = new Group();

    // Draws Diagonal Lines
    if (projectState.patternType === "diagonal-lines") {
      for (var y = y1 + w, i = 1; y <= y2; y += w / 2, i++) {
        var patternShape = new Path.Line(
          new Point(
            x1 + (i * w) / 2,
            -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + y1
          ),
          new Point(
            x1 + (i * w) / 2,
            Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + y1
          )
        );
        patternShape.strokeColor = projectState.patternColor;
        patternShape.strokeWidth = size / 3;
        group.addChild(patternShape);
      }
      for (var y = y1, i = 0; y <= y2; y += w / 2, i--) {
        var patternShape2 = new Path.Line(
          new Point(
            x1 + (i * w) / 2,
            -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + y1
          ),
          new Point(
            x1 + (i * w) / 2,
            Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + y1
          )
        );
        patternShape2.strokeColor = projectState.patternColor;
        patternShape2.strokeWidth = size / 3;
        group.addChild(patternShape2);
      }
      group.rotate(45, x1, y1);
      return;
    }

    // Draws Halftone
    if (projectState.patternType === "halftone-circles") {
      // Draws pattern for downward mouse drag
      if (y2 > y1) {
        for (var y = y1 + w / 8, i = j; y <= y2, i > 1; y += w / 2, i--) {
          for (
            var x = x1;
            x <= Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1 - r, 2)) + x1;
            x += w / 2
          ) {
            new Path.Circle(
              new Point(x, y),
              (10 * size * (i / j)) / 4
            ).fillColor = projectState.patternColor;
          }
        }
        for (var y = y1 + w / 8, i = j; y <= y2, i > 1; y += w / 2, i--) {
          for (
            var x = x1 - w / 2;
            x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1 - r, 2)) + x1;
            x -= w / 2
          ) {
            new Path.Circle(
              new Point(x, y),
              (10 * size * (i / j)) / 4
            ).fillColor = projectState.patternColor;
          }
        }
      }
      // Draws pattern for upward mouse drag
      if (y2 < y1) {
        for (var y = y1 - w / 8, i = j; y >= y2, i > 1; y -= w / 2, i--) {
          for (
            var x = x1;
            x <= Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1 + r, 2)) + x1;
            x += w / 2
          ) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
        for (var y = y1 - w / 8, i = j; y >= y2, i > 1; y -= w / 2, i--) {
          for (
            var x = x1 - w / 2;
            x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1 + r, 2)) + x1;
            x -= w / 2
          ) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      return;
    }

    // Draws solid shape
    if (projectState.patternType === "solid") {
      var circle = new Path.Circle(point1, r);
      circle.fillColor = projectState.patternColor;
      return;
    }

    // Draws grid patterns
    for (var y = 0; y <= 10000; y += h) {
      for (
        var x = x1;
        x <= Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
        x += w
      ) {
        projectState.drawPattern(x, y);
      }
    }
    for (var y = 0; y <= 10000; y += h) {
      for (
        var x = x1 - w;
        x >= -Math.sqrt(Math.pow(r, 2) - Math.pow(y - y1, 2)) + x1;
        x -= w
      ) {
        projectState.drawPattern(x, y);
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

    // Sets number of rows
    var j = 50;
    var i;

    // Draws pattern
    if (projectState.patternType === "diagonal-lines") {
      if (y2 > y1) {
        for (
          var y = y1, i = 0;
          y <= y2;
          y += ((w / 2) * Math.sqrt(3)) / 2, i++
        ) {
          var patternShape = new Path.Line(
            new Point(x1 + (i * w) / 2 / 2, y),
            new Point(x1 - (y2 - y1) / Math.sqrt(3) + (i * w) / 2, y2)
          );
          patternShape.strokeColor = projectState.patternColor;
          patternShape.strokeWidth = size / 3;
        }
      } else {
        for (
          var y = y1, i = 0;
          y >= y2;
          y -= ((w / 2) * Math.sqrt(3)) / 2, i--
        ) {
          var patternShape = new Path.Line(
            new Point(x1 + (i * w) / 2 / 2, y),
            new Point(x1 - (y2 - y1) / Math.sqrt(3) + (i * w) / 2, y2)
          );
          patternShape.strokeColor = projectState.patternColor;
          patternShape.strokeWidth = size / 3;
        }
      }
      return;
    }

    if (projectState.patternType === "halftone-circles") {
      // Draws pattern for downward mouse drag
      if (y2 > y1) {
        for (
          var y = y1, i = j;
          y <= y2;
          y += ((Math.sqrt(3) / 2) * w) / 2, i--
        ) {
          for (
            var x = (-1 / Math.sqrt(3)) * y + x1 + (1 / Math.sqrt(3)) * y1;
            x <= (1 / Math.sqrt(3)) * y + x1 - 0.578 * y1;
            x += w / 2
          ) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      // Draws pattern for upward mouse drag
      if (y2 < y1) {
        for (
          var y = y1, i = j;
          y >= y2;
          y -= ((Math.sqrt(3) / 2) * w) / 2, i--
        ) {
          for (
            var x = (1 / Math.sqrt(3)) * y + x1 - (1 / Math.sqrt(3)) * y1;
            x <= (-1 / Math.sqrt(3)) * y + x1 + 0.578 * y1;
            x += w / 2
          ) {
            new Path.Circle(new Point(x, y), (w * (i / j)) / 4).fillColor =
              projectState.patternColor;
          }
        }
      }
      return;
    }

    // Draws solid shape
    if (projectState.patternType === "solid") {
      var path = new Path({
        segments: [
          [x1, y1],
          [(-1 / Math.sqrt(3)) * y2 + x1 + (1 / Math.sqrt(3)) * y1, y2],
          [(1 / Math.sqrt(3)) * y2 + x1 - 0.578 * y1, y2],
        ],
        fillColor: projectState.patternColor,
        closed: true,
      });
      return;
    }

    // Draws grid patterns
    if (y2 > y1) {
      for (var y = y1; y <= y2; y += (Math.sqrt(3) / 2) * w) {
        for (
          var x = (-1 / Math.sqrt(3)) * y + x1 + (1 / Math.sqrt(3)) * y1;
          x <= (1 / Math.sqrt(3)) * y + x1 - 0.578 * y1;
          x += w
        ) {
          projectState.drawPattern(x, y);
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
          projectState.drawPattern(x, y);
        }
      }
    }
  };

  const circlePattern = (x, y) => {
    var size = projectState.sizeValue;
    var x;
    var y;

    new Path.Circle(new Point(x, y), size).fillColor =
      projectState.patternColor;
  };

  const squarePattern = (x, y) => {
    var size = (projectState.sizeValue * 5) / 3;
    var x;
    var y;

    new Path.Rectangle(new Point(x, y), size, size).fillColor =
      projectState.patternColor;
  };

  const slashPattern = (x, y) => {
    var size = projectState.sizeValue;
    var l = (size * 8) / 3;
    var x;
    var y;

    var patternShape = new Path.Line(
      new Point(x, y),
      new Point(x - (3 / 4) * l, y + l)
    );
    patternShape.strokeColor = projectState.patternColor;
    patternShape.strokeWidth = (size * 2) / 3;
  };

  const crossPattern = (x, y) => {
    var size = projectState.sizeValue;
    var l = (size * 10) / 3;
    var x;
    var y;

    var patternShapeUp = new Path.Line(
      new Point(x + l / 2, y),
      new Point(x + l / 2, y + l)
    );
    patternShapeUp.strokeColor = projectState.patternColor;
    patternShapeUp.strokeWidth = size / 3;
    var patternShapeDown = new Path.Line(
      new Point(x, y + l / 2),
      new Point(x + l, y + l / 2)
    );
    patternShapeDown.strokeColor = projectState.patternColor;
    patternShapeDown.strokeWidth = size / 3;
  };

  const value = {
    shapeType: "square",
    drawShape: squareShape,
    patternType: "circle-pattern",
    drawPattern: circlePattern,
    patternColor: "#D3AD44",
    spacingValue: 30,
    sizeValue: 3,
    backgroundColor: "#FFFFFF",
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
      if (projectState.patternType === "circle-pattern") {
        projectDispatch({ type: "SET_DRAW_PATTERN", payload: circlePattern });
      }
      if (projectState.patternType === "square-pattern") {
        projectDispatch({ type: "SET_DRAW_PATTERN", payload: squarePattern });
      }
      if (projectState.patternType === "slash-pattern") {
        projectDispatch({ type: "SET_DRAW_PATTERN", payload: slashPattern });
      }
      if (projectState.patternType === "cross-pattern") {
        projectDispatch({ type: "SET_DRAW_PATTERN", payload: crossPattern });
      }
    },
    // useEffect dependencies
    [
      projectState.shapeType,
      projectState.patternType,
      projectState.drawShape,
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
