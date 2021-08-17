import { useEffect, useState } from "react";
import { useProjectContext } from "../../Context/ProjectContext";
import Paper, { Path, Point, PaperScope, project, Tool } from "paper";

const ShapeTool = () => {
  const [projectState, projectDispatch] = useProjectContext();

  const isShapeSelected = (shape) => {
    return projectState.shapeType === shape;
  };

  return (
    <div className="Drawing-tools">
      <div className="tool-name">Shape</div>
      <div>
        <button
          className="shape-button"
          onClick={() => {
            projectDispatch({ type: "SET_SHAPE_TYPE", payload: "square" });
          }}
        >
          <svg
            class={
              isShapeSelected("square") ? "shape-icon-selected" : "shape-icon"
            }
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="62"
              height="62"
              stroke="#8A124D"
              stroke-width="2"
            />
          </svg>
        </button>
        <button
          className="shape-button"
          onClick={() =>
            projectDispatch({ type: "SET_SHAPE_TYPE", payload: "circle" })
          }
        >
          <svg
            class={
              isShapeSelected("circle") ? "shape-icon-selected" : "shape-icon"
            }
            width="64"
            height="64"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="31" cy="31" r="30" stroke="#8A124D" stroke-width="2" />
          </svg>
        </button>
        <button
          className="shape-button"
          onClick={() =>
            projectDispatch({ type: "SET_SHAPE_TYPE", payload: "triangle" })
          }
        >
          <svg
            class={
              isShapeSelected("triangle") ? "shape-icon-selected" : "shape-icon"
            }
            width="74"
            height="64"
            viewBox="0 0 72 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.737 61L36 1.99149L70.263 61H1.737Z"
              stroke="#8A124D"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShapeTool;
