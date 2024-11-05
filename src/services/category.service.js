import axios from 'axios';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase';
const baseUrl = import.meta.env.VITE_CATEGORY_API_BASE_URL;

const CategoryService = () => {
  const getCategories = async () => {
    const { data } = await axios.get(baseUrl);
    return data;
  };

  const getCategoryById = async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    return data;
  };

  return { getCategories, getCategoryById };
};

export const getFirebaseCategories = async () => {
  const categoriesCollection = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  const data = [];

  categoriesSnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

export const getFirebaseCategoryById = async (id) => {
  const docRef = collection(db, "categories", id);
  const docSnap = await getDoc(docRef);
  const data = { ...docSnap.data(), id: docSnap.id };

  return data;
};

const service = CategoryService();

export default service;
