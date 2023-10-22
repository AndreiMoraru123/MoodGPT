'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, _value)
            setIsLoading(false)
        },
    })
    return (
        <div className="w-full h-full relative overflow-hidden">
            {isLoading && <div>...loading</div>}
            <textarea className="absolute top-0 text-xl outline-none"
                value={value} onChange={(e) => setValue(e.target.value)}
                style={{ 
                    resize: 'none', 
                    overflow: 'hidden', 
                    boxSizing: 'border-box',
                    width: 'calc(100% - 25px)', 
                    height: 'calc(100% - 25px)',
                    padding: '8px'
                }} 
            />
        </div>
    )
}

export default Editor

