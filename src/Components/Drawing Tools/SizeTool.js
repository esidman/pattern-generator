import React from 'react'

const SizeTool = () => {
    return (
        <div className="Drawing-tools">
            <div>
            Size
            </div>
            <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
            </div>
        </div>
    )
}

export default SizeTool
