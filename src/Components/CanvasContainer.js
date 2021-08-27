import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Paper, { project, paper, Tool, View, activeLayer } from "paper";
import { useProjectContext } from "../Context/ProjectContext";
import ColorPicker from "./ColorPicker";
import { Layer } from "paper/dist/paper-core";

const CanvasContainer = () => {
  const [open, setOpen] = useState(false);

  const [projectState, projectDispatch] = useProjectContext();

  useEffect(() => {
    Paper.setup("paper-canvas");
  }, []);

  const handleExportSVG = (fileName) => {
    if (!fileName) {
      fileName = "paperjs_example.svg";
    }

    var url =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        project.exportSVG({ asString: true, bounds: "content" })
      );

    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
  };

  // const removeLastLayer = () => {
  //   var lastLayer = project.activeLayer;
  //   // lastLayer.activate();
  //   lastLayer.remove();
  // };

  // const addLastLayer = (lastLayer) => {
  //   project.layers.push(lastLayer);
  // };

  return (
    <div className="canvas-container">
      <div className="canvas-history-button-group">
        <button
          type="button"
          title="Undo"
          className="canvas-history-button"
          onClick={() => project.activeLayer.remove()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#8B134D"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.5 8C9.85 8 7.45 8.99 5.6 10.6L2 7V16H11L7.38 12.38C8.77 11.22 10.54 10.5 12.5 10.5C16.04 10.5 19.05 12.81 20.1 16L22.47 15.22C21.08 11.03 17.15 8 12.5 8Z" />
          </svg>
        </button>
        {/* <button
          type="button"
          className="canvas-history-button"
          onClick={addLastLayer}
        >
          Redo
        </button> */}
        <button
          type="button"
          className="canvas-history-button"
          title="Clear"
          onClick={() => project.clear()}
        >
          Clear
        </button>
        <h3>Click and drag in the canvas to draw</h3>
      </div>
      <div
        className="canvas-box"
        style={{ backgroundColor: projectState.backgroundColor }}
      >
        <Canvas drawShape={projectState.drawShape} />
      </div>
      {open && (
        <div className="color-picker-menu">
          <ColorPicker colorPickerType="SET_BACKGROUND_COLOR" />
        </div>
      )}
      <div className="canvas-bottom-button-group">
        <div className="background-color-button-group">
          <button
            type="button"
            className="background-color-button"
            style={{ backgroundColor: projectState.backgroundColor }}
            onClick={() => setOpen(!open)}
          ></button>
          <p className="background-color-name">Background Color</p>
        </div>
        <button
          className="export-button"
          onClick={() => handleExportSVG("pattern")}
        >
          Export SVG
        </button>
      </div>
      {open && (
        <div>
          <button
            className="menu_closer"
            style={{
              height: "98vh",
              width: "98vw",
              left: "0",
              top: "0",
              position: "absolute",
              opacity: "0",
              zIndex: "1",
              border: "0",
              padding: "0",
            }}
            onClick={() => setOpen(!open)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default CanvasContainer;
