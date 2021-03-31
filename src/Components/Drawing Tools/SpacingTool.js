import React from 'react'

const SpacingTool = () => {
    return (
        <div className="Drawing-tools">
            <div>
            Spacing
            </div>
            <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
            </div>
        </div>
    )
}

export default SpacingTool
