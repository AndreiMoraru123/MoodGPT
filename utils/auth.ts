import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async (select = {id: true}) => {
    const {userId} = auth()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId as string,
        },
        select,
    }) 

    return user
}
