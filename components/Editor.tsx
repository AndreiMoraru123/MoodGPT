'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"
import Spinner from './Spinner'

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)
    const { mood, summary, color, subject, negative } = analysis
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' },
    ]
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setIsLoading(false)
        },
    })
    return (
        <div className="w-full h-full relative overflow-hidden grid grid-cols-3">
            <div className="col-span-2 relative">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="absolute top-4 right-4 w-[16px] h-[16px] rounded-full bg-red-500"></div>
                )}
                <textarea
                    className="w-full h-full text-xl outline-none p-4"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="col-span-1">
                <div className='px-5 py-5' style={{ backgroundColor: color }}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map((item) => (
                            <li key={item.name}
                                className='px-2 py-4 flex items-center justify-between border-b border-black/15'>
                                <span className='text-lg font-semibold'>{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor

