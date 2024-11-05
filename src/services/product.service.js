import axios from "axios";
import { db } from "../utils/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getFirebaseCategories } from "./category.service";
const baseUrl = import.meta.env.VITE_PRODUCT_API_BASE_URL;

const ProductService = () => {
  /**
   * Fetches service from the backend API - allowing for full-text search & category filtering.
   *
   * ### Example
   * ```js
   * // Fetches all the products
   * const products = await ProductService.getProducts();
   *
   * // Fetches all the products with 'table' in any of its string fields
   * const products = await ProductService.getProducts({ searchString: 'table' });
   *
   * // Fetches all the products from category with the id 4
   * const products = await ProductService.getProducts({ categoryId: 4 });
   * ```
   *
   * @param {object} filters
   * @returns
   */
  const getProducts = async (filters) => {
    const defaults = { searchString: "", categoryId: null };
    const { searchString, categoryId } = { ...defaults, ...filters };

    const searchStringFilter = searchString !== "" ? `q=${searchString}` : "";
    const categoryFilter =
      categoryId !== null ? `category=${categoryId ?? ""}` : "";

    const filterQueryString = [categoryFilter, searchStringFilter]
      .filter((filter) => filter != "")
      .join("&");

    const { data } = await axios.get(
      `${baseUrl}${filterQueryString ? `?${filterQueryString}` : ""}`
    );

    return data;
  };

  const getProductById = async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`);

    return data;
  };

  return { getProducts, getProductById };
};

const service = ProductService();

export default service;

//FIREBASE DATA FETCHING

export const getFirebaseProducts = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const data = [];

  productsSnapshot.forEach((doc) => {
    if (doc.data().quantity > 0) {
      data.push({ id: doc.id, ...doc.data() });
    }
  });

  return data;
};

export const getSingleFirebaseProduct = async (id) => {
  const productRef = doc(db, "products", id);
  const productSnapshot = await getDoc(productRef);

  return { id: productSnapshot.id, ...productSnapshot.data() };
};

export const getFirebaseSearchResults = async (search) => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  let data = [];
  const categories = await getFirebaseCategories();
  let searchCategory = null;

  if (search.categoryId) {
    searchCategory = categories.find((c) => {
      return c.id === search.categoryId;
    });
  } else {
    searchCategory = -1;
  }

  productsSnapshot.forEach((doc) => {
    if (
      doc.data().name.toLowerCase().includes(search.searchString.toLowerCase())
    ) {
      data.push({ id: doc.id, ...doc.data() });
    }
  });

  if (searchCategory !== -1) {
    data = data.filter((item) => {
      return String(item.category) === searchCategory.id;
    });
  }

  return data;
};
