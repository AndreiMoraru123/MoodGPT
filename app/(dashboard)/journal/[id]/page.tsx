import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async id => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId: user.id,
            id,
        },
        include: {
            analysis: true,
        },
    })

    return entry
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)
    const {mood, summary, color, subject, negative} = entry?.analysis
    const analysisData = [
        { name: 'Summary', value: summary},
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True': 'False'},
    ]
    return (
        <div className="h-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry={entry} />
            </div>
            <div>
                <div className='px-5 py-5' style={{backgroundColor: color}}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map((item) => (
                            <li key={item.name}
                                className='px-2  py-4 flex items-center justify-between
                                border-b border-black/15'>
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

export default EntryPage
