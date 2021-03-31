import { useContext, createContext, useReducer, useEffect } from "react";
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
  const value = {
    shapeType: "square",
    drawShape: squareShape,
    patternType: "slash",
    patternColor: "#8A124D",
  };

  const [state, dispatch] = useReducer(reducer, value);
  const squareShape = () => {
    console.log("drawingSquare");
  };
  const circleShape = () => {};
  const triangleShape = () => {};

  useEffect(() => {
    console.log("shapeType", state.shapeType);
    if (state.shapeType === "square") {
      console.log("setting draw shape to square");
      dispatch({ type: "SET_DRAW_SHAPE", payload: squareShape });
    }
    if (state.shapeType === "circle") {
      dispatch({ type: "SET_DRAW_SHAPE", payload: circleShape });
    }
    if (state.shapeType === "triangle") {
      dispatch({ type: "SET_DRAW_SHAPE", payload: triangleShape });
    }
  }, [state.shapeType]);
  return (
    <ProjectContext.Provider value={[state, dispatch]}>
      {children}
    </ProjectContext.Provider>
  );
}
