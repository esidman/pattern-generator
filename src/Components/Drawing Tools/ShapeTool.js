import { useEffect, useState } from "react";
import { useProjectContext } from "../../Context/ProjectContext";
import Paper, { Path, Point, PaperScope, project, Tool } from "paper";

const ShapeTool = () => {
  const [selectedShape, setSelectedShape] = useState("Square");
  const [state, dispatch] = useProjectContext();

  return (
    <div className="Drawing-tools">
      <div>Shape</div>
      <div>
        <button
          onClick={() => {
            console.log("square was clicked");
            dispatch({ type: "SET_SHAPE_TYPE", payload: "square" });
          }}
        >
          Square
        </button>
        <button
          onClick={() =>
            dispatch({ type: "SET_SHAPE_TYPE", payload: "circle" })
          }
        >
          Circle
        </button>
        <button
          onClick={() =>
            dispatch({ type: "SET_SHAPE_TYPE", payload: "triangle" })
          }
        >
          Triangle
        </button>
      </div>
    </div>
  );
};

export default ShapeTool;
