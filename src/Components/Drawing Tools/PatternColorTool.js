import React from "react";
import { useProjectContext } from "../../Context/ProjectContext";

const PatternColorTool = () => {
  const [projectState, projectDispatch] = useProjectContext();

  return (
    <div className="Drawing-tools">
      <div className="tool-name">Pattern Color</div>
      <div className="color-button-block">
        <button
          className="color-button"
          style={{ backgroundColor: "#F0E4EB" }}
          title="Lively Lavender"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#F0E4EB",
            });
          }}
        >
          {/* Lively Lavendar */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#8D134D" }}
          title="Brash Burgundy"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#8D134D",
            });
          }}
        >
          {/* Brash Burgundy */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#341225" }}
          title="Black Raspberry"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#341225",
            });
          }}
        >
          {/* Black Raspberry */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#96BCBC" }}
          title="Cold Indigo"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#96BCBC",
            });
          }}
        >
          {/* Cold Indigo */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#0A2C49" }}
          title="Medium Indigo"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#0A2C49",
            });
          }}
        >
          {/* Medium Indigo */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#001129" }}
          title="Dark Indigo"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#001129",
            });
          }}
        >
          {/* Dark Indigo */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#E4F2E4" }}
          title="Giddy Green"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#E4F2E4",
            });
          }}
        >
          {/* Giddy Green */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#80998C" }}
          title="Growing Green"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#80998C",
            });
          }}
        >
          {/* Growing Green */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#6F7347" }}
          title="Graceful Olive"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#6F7347",
            });
          }}
        >
          {/* Graceful Olive */}
        </button>
        <button
          className="color-button"
          style={{ backgroundColor: "#2D3F23" }}
          title="Forest Green"
          onClick={() => {
            projectDispatch({
              type: "SET_PATTERN_COLOR",
              payload: "#2D3F23",
            });
          }}
        >
          {/* Forest Green */}
        </button>
      </div>
    </div>
  );
};

export default PatternColorTool;
