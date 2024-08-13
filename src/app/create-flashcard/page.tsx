"use client"

import React, { useState } from "react"
import { generateFlashcards } from "@/utils/llmCommunication"
import {
  addCollectionForUser,
  addFlashcardToCollection,
  getCollectionsForUser,
} from "@/utils/firebaseFunctions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

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
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      setUserId(user.id)
    }
  }, [user])

  const handleGenerateFlashcards = async () => {
    try {
      const response = await generateFlashcards(text)

      if (response && response.flashcards) {
        setFlashcards(response.flashcards)
      }
    } catch (error: any) {
      console.error(
        "Error generating flashcards:",
        error.response ? error.response.data : error.message
      )
    }
  }

  const handleSaveCollection = async () => {
    try {
      if (!collectionName) {
        alert("Please provide a name for the collection.")
        return
      }

      await addCollectionForUser(userId, collectionName, flashcards)
      toast.success("Collection saved successfully!")
        router.push("/dashboard")
    } catch (error) {
      console.error("Error saving collection:", error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Flashcard Generator
        </h1>
        <div className="flashcards-container">
          {flashcards.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Collection Name"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={handleSaveCollection}
                  className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  Save Collection
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {flashcards.map((flashcard, index) => (
                  <FlashcardItem
                    key={index}
                    flashcard={flashcard}
                    onEdit={(updatedFlashcard) => {
                      const updatedFlashcards = flashcards.map((card, i) =>
                        i === index ? updatedFlashcard : card
                      )
                      setFlashcards(updatedFlashcards)
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-center mb-4">
                No flashcards generated yet. Enter some text to get started!
              </p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                className="w-full h-32 bg-gray-700 rounded-lg p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleGenerateFlashcards}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                Generate Flashcards
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateFlashcard

interface FlashcardItemProps {
  flashcard: Flashcard
  onEdit: (updatedFlashcard: Flashcard) => void
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ flashcard, onEdit }) => {
  const [flipped, setFlipped] = useState<boolean>(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null
  )
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editableFlashcard, setEditableFlashcard] = useState<Flashcard>(flashcard)

  const handleFlip = () => setFlipped(!flipped)

  const handleAnswer = (correct: boolean) => setAnsweredCorrectly(correct)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit(editableFlashcard)
    setIsEditing(false)
  }

  return (
    <div
      onClick={handleFlip}
      className={`flashcard relative w-64 h-64 bg-gray-700 cursor-pointer transition-transform duration-500 ease-in-out transform ${
        flipped ? "rotate-y-180" : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div
        className={`absolute inset-0 bg-gray-700 p-6 rounded-lg ${
          flipped ? "hidden" : "block"
        }`}
      >
        <h3 className="text-xl font-semibold text-orange-400 text-center">
          {flashcard.title}
        </h3>
        <button
          onClick={handleEdit}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Edit
        </button>
      </div>

      <div
        className={`absolute inset-0 mx-2 bg-gray-600 p-6 rounded-lg backface-hidden ${
          flipped ? "block" : "hidden"
        }`}
      >
        <p className="text-gray-200">{flashcard.content}</p>
        <div className="flex justify-around mt-4">
          <button
            onClick={() => handleAnswer(true)}
            className={`px-4 py-2 font-bold text-white rounded-lg ${
              answeredCorrectly === true ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className={`px-4 py-2 font-bold text-white rounded-lg ${
              answeredCorrectly === false ? "bg-red-500" : "bg-gray-500"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="absolute inset-0 bg-gray-800 p-6 rounded-lg flex flex-col space-y-4">
          <input
            type="text"
            value={editableFlashcard.title}
            onChange={(e) => setEditableFlashcard({ ...editableFlashcard, title: e.target.value })}
            className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
            placeholder="Title"
          />
          <textarea
            value={editableFlashcard.content}
            onChange={(e) => setEditableFlashcard({ ...editableFlashcard, content: e.target.value })}
            className="w-full h-32 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
            placeholder="Content"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}