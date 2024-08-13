import { collection, addDoc, getDocs, query, where, DocumentData } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Flashcard {
  title: string;
  content: string;
}

interface Collection {
  name: string;
  flashcards: Flashcard[];
}

export const addCollectionForUser = async (userId: string, collectionName: string, flashcards: Flashcard[]) => {
  try {
    const collectionRef = collection(db, "users", userId, "collections");
    await addDoc(collectionRef, {
      name: collectionName,
      flashcards: flashcards,
    });
    console.log("Collection added successfully");
  } catch (e) {
    console.error("Error adding collection: ", e);
  }
};

export const getCollectionsForUser = async (userId: string): Promise<DocumentData[]> => {
  try {
    const collectionsRef = collection(db, "users", userId, "collections");
    const querySnapshot = await getDocs(collectionsRef);
    const collections: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      collections.push({ id: doc.id, ...doc.data() });
    });
    return collections;
  } catch (e) {
    console.error("Error fetching collections: ", e);
    return [];
  }
};

export const addFlashcardToCollection = async (
  userId: string,
  collectionId: string,
  flashcard: Flashcard
) => {
  try {
    const collectionRef = collection(db, "users", userId, "collections", collectionId, "flashcards");
    await addDoc(collectionRef, flashcard);
    console.log("Flashcard added successfully");
  } catch (e) {
    console.error("Error adding flashcard: ", e);
  }
};

export const getFlashcardsFromCollection = async (userId: string, collectionId: string): Promise<DocumentData[]> => {
  try {
    const flashcardsRef = collection(db, "users", userId, "collections", collectionId, "flashcards");
    const querySnapshot = await getDocs(flashcardsRef);
    const flashcards: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      flashcards.push({ id: doc.id, ...doc.data() });
    });
    return flashcards;
  } catch (e) {
    console.error("Error fetching flashcards: ", e);
    return [];
  }
};
