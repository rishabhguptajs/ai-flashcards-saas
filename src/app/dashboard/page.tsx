"use client"

import { SignedIn, useUser, useSession, UserButton } from "@clerk/nextjs"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCollectionsForUser } from "@/utils/firebaseFunctions"

const Dashboard = () => {
  const { user } = useUser()
  const { session } = useSession()
  const router = useRouter()

  const [collections, setCollections] = useState<any[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      if (user) {
        const userCollections = await getCollectionsForUser(user.id)
        setCollections(userCollections)
      }
    }

    fetchCollections()
  }, [user])

  const maxFlashcards = 50
  const maxCollections = 5

  const totalFlashcards = collections.reduce(
    (total, collection) => total + collection.flashcards.length,
    0
  )
  const remainingFlashcards = maxFlashcards - totalFlashcards
  const remainingCollections = maxCollections - collections.length

  const isButtonDisabled =
    (remainingFlashcards <= 0) || (collections.length >= maxCollections)

  return (
    <>
      <SignedIn>
        <div className="flex flex-col min-h-screen bg-gray-900 text-white p-6">
          <header className="flex justify-between items-center w-full mb-8">
            <h1 className="text-4xl font-bold text-blue-400">Dashboard</h1>
            <div className="flex space-x-4">
              <Link
                href={isButtonDisabled ? "#" : "/create-flashcard"}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                  !isButtonDisabled
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                aria-disabled={isButtonDisabled}
              >
                Create New Flashcard
              </Link>

              <button className="px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold transition duration-200 hover:bg-blue-500">
                <Link href="/my-subscription">My Subscription</Link>
              </button>
              <motion.button>
                <UserButton />
              </motion.button>
            </div>
          </header>

          <section className="text-white mb-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg mb-4"
            >
              Welcome, {user?.firstName}!
            </motion.div>
            <div className="flex justify-between text-sm text-gray-400">
              <div>
                <p>Total Flashcards: {totalFlashcards}</p>
                <p>Remaining Flashcards: {remainingFlashcards}</p>
              </div>
              <div>
                <p>Total Collections: {collections.length}</p>
                <p>Remaining Collections: {remainingCollections}</p>
              </div>
            </div>
          </section>

          <section className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                Your Flashcards
              </h2>
              {collections.length > 0 ? (
                collections.map((collection: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold text-blue-400">
                      {collection.name}
                    </h3>
                    <p>{collection.flashcards.length} flashcards</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {collection.flashcards.map(
                        (flashcard: any, idx: number) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-gray-700 rounded-lg"
                          >
                            <h4 className="text-lg font-semibold">
                              {flashcard.title}
                            </h4>
                            <p>{flashcard.content}</p>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  No flashcards yet. Start by creating a new collection.
                </p>
              )}
            </motion.div>
          </section>
        </div>
      </SignedIn>

      {!session && (
        <div className="flex flex-row items-center justify-center min-h-screen bg-black text-white cursor-default">
          Please{" "}
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-white text-black m-2 rounded-md"
          >
            &nbsp; Sign-In &nbsp;
          </button>{" "}
          to access this page
        </div>
      )}
    </>
  )
}

export default Dashboard
