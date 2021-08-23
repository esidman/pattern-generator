import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Paper, { project, Tool, View } from "paper";
import { useProjectContext } from "../Context/ProjectContext";
import ColorPicker from "./ColorPicker";

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

  console.log(projectState.backgroundColor);

  return (
    <div className="canvas-container">
      <div className="canvas-history-button-group">
        {/* <button type="button" className="canvas-history-button">
          Undo
        </button>
        <button type="button" className="canvas-history-button">
          Redo
        </button> */}
        <button
          type="button"
          className="canvas-history-button"
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
