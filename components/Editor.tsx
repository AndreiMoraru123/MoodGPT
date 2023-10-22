'use client'

import { useState } from "react"

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    return (
        <div className="w-full h-full relative overflow-hidden">
            <textarea className="absolute top-0 text-xl outline-none"
                value={value} onChange={(e) => setValue(e.target.value)}
                style={{ 
                    resize: 'none', 
                    overflow: 'hidden', 
                    boxSizing: 'border-box',
                    width: 'calc(100% - 25px)',  // Adjust width to create a left gap
                    height: 'calc(100% - 25px)', // Adjust height to create a bottom gap
                    padding: '8px'
                }} 
            />
        </div>
    )
}

export default Editor

