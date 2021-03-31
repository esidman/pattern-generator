import React from 'react'
import ShapeTool from './Drawing Tools/ShapeTool'
import PatternTool from './Drawing Tools/PatternTool'
import PatternColorTool from './Drawing Tools/PatternColorTool'
import SpacingTool from './Drawing Tools/SpacingTool'
import SizeTool from './Drawing Tools/SizeTool'

const DrawingTools = () => {
    return (
        <div className="Toolbar">
            <ShapeTool />
            <PatternTool />
            <PatternColorTool />
            <SpacingTool />
            <SizeTool />
        </div>
    )
}

export default DrawingTools
