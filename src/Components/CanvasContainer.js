import React from 'react'
import Canvas from './Canvas'
import {project} from 'paper';

const CanvasContainer = () => {
    const handleExportSVG = (fileName) => {
        if(!fileName) {
          fileName = "paperjs_example.svg"
      }
    
      var url = "data:image/svg+xml;utf8," + encodeURIComponent(project.exportSVG({asString:true}));
      
      var link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      link.click();
      }

    return (
        <div className="canvas-container">
            <div className="canvas-history-button-group">
                <button type="button" className="canvas-history-button">Undo</button>
                <button type="button" className="canvas-history-button">Redo</button>
                <button type="button" className="canvas-history-button">Clear</button> 
            </div>
            <div className="canvas-box">
                <Canvas />
            </div>
            <div className="canvas-bottom-button-group">
                <button type="button" className="color-swatch">Background Color</button>
                <button className="export-button" onClick={() => handleExportSVG("test")}>Export SVG</button>
            </div>               
        </div>
    )
}

export default CanvasContainer