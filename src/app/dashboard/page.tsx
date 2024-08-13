"use client"

import { SignedIn, useUser, useSession } from "@clerk/nextjs"
import { motion } from "framer-motion"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const { user } = useUser()
  const { session } = useSession()
  const router = useRouter()

  const flashcards = [
    {
      title: "HTML Basics",
      content: "HTML stands for HyperText Markup Language.",
    },
    {
      title: "CSS Selectors",
      content:
        "CSS selectors are used to select elements based on their attributes.",
    },
    {
      title: "JavaScript Functions",
      content:
        "Functions are blocks of code designed to perform a particular task.",
    },
    {
      title: "React Components",
      content:
        "Components let you split the UI into independent, reusable pieces.",
    },
    {
      title: "Firebase Authentication",
      content: "Firebase provides backend services for easy authentication.",
    },
  ]
  const collections = [
    {
      name: "Web Development",
      flashcards: [
        {
          title: "HTML Basics",
          content: "HTML stands for HyperText Markup Language.",
        },
        {
          title: "CSS Selectors",
          content:
            "CSS selectors are used to select elements based on their attributes.",
        },
        {
          title: "JavaScript Functions",
          content:
            "Functions are blocks of code designed to perform a particular task.",
        },
      ],
    },
    {
      name: "Frontend Frameworks",
      flashcards: [
        {
          title: "React Components",
          content:
            "Components let you split the UI into independent, reusable pieces.",
        },
        {
          title: "State Management in React",
          content: "State management is crucial for building dynamic web apps.",
        },
      ],
    },
    {
      name: "Backend Services",
      flashcards: [
        {
          title: "Firebase Authentication",
          content:
            "Firebase provides backend services for easy authentication.",
        },
        {
          title: "Firestore Database",
          content:
            "Firestore is a NoSQL document database built for global apps.",
        },
      ],
    },
  ]

  const maxFlashcards = 50
  const maxCollections = 5
  const maxFlashcardsPerCollection = 10

  const remainingFlashcards = maxFlashcards - flashcards.length
  const remainingCollections = maxCollections - collections.length

  return (
    <>
      <SignedIn>
        <div className="flex flex-col min-h-screen bg-gray-900 p-6">
          <header className="flex justify-between items-center w-full mb-8">
            <h1 className="text-4xl font-bold text-blue-400">Dashboard</h1>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor:
                    remainingFlashcards > 0 ? "#68D391" : "#A0AEC0",
                }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                  remainingFlashcards > 0
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={remainingFlashcards <= 0}
              >
                <Link href="/create-flashcard">Create New Flashcard</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#63B3ED" }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold transition duration-200 hover:bg-blue-500"
              >
                <Link href="/my-subscription">My Subscription</Link>
              </motion.button>
            </div>
          </header>

          <section className="text-white mb-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg"
            >
              Welcome, {user?.firstName}!
            </motion.div>
          </section>

          <section className="text-white w-full">
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
                collections.map((collection, index) => (
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
          <button onClick={() => router.push("/sign-in")} className="bg-white text-black m-2 rounded-md">&nbsp; Sign-In &nbsp;</button> to
          access this page
        </div>
      )}
    </>
  )
}

export default Dashboard
