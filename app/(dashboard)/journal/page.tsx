import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntries = async () => {
    const user = await getUserByClerkId()
    const entries = prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()
    console.log(entries)
    return <div>journal</div>
}

export default JournalPage
