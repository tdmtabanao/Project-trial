import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase/firebase";

export const getHeroes = async () => {
  const querySnapshot = await getDocs(collection(db, "hero"));
  const q = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const heroes = [];

  q.forEach((doc) => {
    if (doc.isFeatured) {
      heroes.push(doc);
    }
  });

  return heroes;
};
