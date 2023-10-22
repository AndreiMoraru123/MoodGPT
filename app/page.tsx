import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default async function Home() {

  const { userId } = auth()
  let href = userId? '/journal' : '/new-user' 
  
  return <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
    <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Mood GPT</h1>
        <p className="text-2xl text-white/60 mb-4">Discover Yourself</p>
        <div>
         <Link href={href}>
            <button className="bg-red-600 p-2 rounded-lg text-xl">get started</button>
         </Link>
        </div>
    </div>
  </div>
}
