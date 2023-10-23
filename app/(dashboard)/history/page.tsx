import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
    const user = await getUserByClerkId()
    const analyses = await prisma.analysis.findMany({
        where: {

        }
    })
}

const History = () => {
    return <div>history</div>
}

export default History
