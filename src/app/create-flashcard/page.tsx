"use client"

import React, { useState, useEffect } from "react"
import { generateFlashcards } from "@/utils/llmCommunication"
import {
  addCollectionForUser,
  addFlashcardToCollection,
  getCollectionsForUser,
} from "@/utils/firebaseFunctions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

interface Flashcard {
  title: string
  content: string
}

const CreateFlashcard = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const { user } = useUser()
  const [text, setText] = useState<string>("")
  const [collectionName, setCollectionName] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setUserId(user.id)
    }
  }, [user])

  const handleGenerateFlashcards = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate flashcards.")
      return
    }
    setIsLoading(true)
    try {
      const response = await generateFlashcards(text)
      if (response && response.flashcards) {
        setFlashcards(response.flashcards)
        toast.success("Flashcards generated successfully!")
      }
    } catch (error: any) {
      console.error(
        "Error generating flashcards:",
        error.response ? error.response.data : error.message
      )
      toast.error("Failed to generate flashcards. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCollection = async () => {
    if (!collectionName.trim()) {
      toast.error("Please provide a name for the collection.")
      return
    }
    if (!userId) {
      toast.error("Please sign in to save your collection.")
      return
    }
    setIsLoading(true)
    try {
      await addCollectionForUser(userId, collectionName, flashcards)
      toast.success("Collection saved successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving collection:", error)
      toast.error("Failed to save collection. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8 bg-gray-800 rounded-xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-orange-400 mb-8">
          Flashcard Generator
        </h1>
        <div className="flashcards-container">
          {flashcards.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <input
                  type="text"
                  placeholder="Collection Name"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="w-full sm:w-2/3 bg-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4 sm:mb-0"
                />
                <button
                  onClick={handleSaveCollection}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Saving..." : "Save Collection"}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {flashcards.map((flashcard, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FlashcardItem
                        flashcard={flashcard}
                        onEdit={(updatedFlashcard) => {
                          const updatedFlashcards = flashcards.map((card, i) =>
                            i === index ? updatedFlashcard : card
                          )
                          setFlashcards(updatedFlashcards)
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-gray-400 text-center text-lg">
                No flashcards generated yet. Enter some text to get started!
              </p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                className="w-full h-48 bg-gray-700 rounded-lg p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
              <button
                onClick={handleGenerateFlashcards}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Generating..." : "Generate Flashcards"}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default CreateFlashcard

interface FlashcardItemProps {
  flashcard: Flashcard
  onEdit: (updatedFlashcard: Flashcard) => void
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ flashcard, onEdit }) => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null
  )
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editableFlashcard, setEditableFlashcard] =
    useState<Flashcard>(flashcard)

  const handleToggleContent = () => setIsContentVisible(!isContentVisible)

  const handleAnswer = (correct: boolean) => {
    setAnsweredCorrectly(correct)
    setIsContentVisible(false)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit(editableFlashcard)
    setIsEditing(false)
  }

  return (
    <motion.div
      className="flashcard-container w-full h-64"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flashcard relative w-full h-full cursor-pointer bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl shadow-lg flex flex-col justify-between"
        onClick={handleToggleContent}
      >
        <h3 className="text-2xl font-semibold text-orange-400 text-center mb-4">
          {flashcard.title}
        </h3>
        <AnimatePresence>
          {isContentVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="text-gray-200 text-lg overflow-auto mb-4">
                {flashcard.content}
              </p>
              <div className="flex justify-around mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAnswer(true)
                  }}
                  className={`px-4 py-2 font-bold text-white rounded-lg transition-colors ${
                    answeredCorrectly === true
                      ? "bg-green-500"
                      : "bg-gray-500 hover:bg-green-500"
                  }`}
                >
                  Correct
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAnswer(false)
                  }}
                  className={`px-4 py-2 font-bold text-white rounded-lg transition-colors ${
                    answeredCorrectly === false
                      ? "bg-red-500"
                      : "bg-gray-500 hover:bg-red-500"
                  }`}
                >
                  Incorrect
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={handleEdit}
          className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Edit
        </button>
      </motion.div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-800 p-6 rounded-xl flex flex-col space-y-4 z-10"
        >
          <input
            type="text"
            value={editableFlashcard.title}
            onChange={(e) =>
              setEditableFlashcard({
                ...editableFlashcard,
                title: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Title"
          />
          <textarea
            value={editableFlashcard.content}
            onChange={(e) =>
              setEditableFlashcard({
                ...editableFlashcard,
                content: e.target.value,
              })
            }
            className="w-full h-32 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Content"
          />
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
