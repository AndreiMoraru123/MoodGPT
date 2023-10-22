import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async id => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId: user.id,
            id,
        }
    })

    return entry
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)
    const analysisData = [
        { name: 'Summary', value: '' },
        { name: 'Subject', value: '' },
        { name: 'Mood', value: '' },
        { name: 'Negative', value: 'False' },
    ]
    return (
        <div className="h-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry={entry} />
            </div>
            <div>
                <div className='bg-red-300 px-5 py-5'>
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
