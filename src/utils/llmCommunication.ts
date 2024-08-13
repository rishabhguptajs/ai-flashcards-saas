import axios from "axios"

interface Flashcard {
  title: string
  content: string
}

interface FlashcardsResponse {
  flashcards: Flashcard[]
}

export const generateFlashcards = async (
  text: string
): Promise<FlashcardsResponse | null> => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen-2-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a flashcard AI. You have to generate flashcards based on the given text: ${text}. DO NOT GENERATE MORE THAN 10 FLASHCARDS.

                        Your response should be in a json format like this: 
                        {
                            "flashcards": [
                                {
                                    "title": "Title of the flashcard",
                                    "content": "Content of the flashcard"
                                }
                            ]
                        } `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const content = response.data.choices[0].message.content

    const parsedContent: FlashcardsResponse = JSON.parse(content)

    return parsedContent
  } catch (error: any) {
    console.error(
      "Error generating flashcards:",
      error.response ? error.response.data : error.message
    )
    return null
  }
}
