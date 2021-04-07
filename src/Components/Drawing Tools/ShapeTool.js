import { useEffect, useState } from "react";
import { useProjectContext } from "../../Context/ProjectContext";
import Paper, { Path, Point, PaperScope, project, Tool } from "paper";

const ShapeTool = () => {
  const [projectState, projectDispatch] = useProjectContext();

  return (
    <div className="Drawing-tools">
      <div>Shape</div>
      <div>
        <button
          onClick={() => {
            console.log("square was clicked");
            projectDispatch({ type: "SET_SHAPE_TYPE", payload: "square" });
          }}
        >
          Square
        </button>
        <button
          onClick={() =>
            projectDispatch({ type: "SET_SHAPE_TYPE", payload: "circle" })
          }
        >
          Circle
        </button>
        <button
          onClick={() =>
            projectDispatch({ type: "SET_SHAPE_TYPE", payload: "triangle" })
          }
        >
          Triangle
        </button>
      </div>
    </div>
  );
};

export default ShapeTool;
