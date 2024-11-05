import axios from "axios";
const baseUrl = import.meta.env.VITE_USER_API_BASE_URL;
import { db } from "../utils/firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase/firebase";
import { useToast } from "@/hooks";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const toast = useToast();

const AuthService = () => {
  const getUsers = async () => {
    const { data } = await axios.get(baseUrl);
    return data;
  };

  const loginUser = async ({ email, password }) => {
    const users = await getUsers();
    const loggedInUser = users.find(
      (u) => email === u.email && password === u.password
    );
    if (loggedInUser !== undefined) {
      return loggedInUser;
    } else {
      throw new Error("Wrong email or password");
    }
  };

  return { getUsers, loginUser };
};

const service = AuthService();

//FIREBASE AUTHENTICATION
export const createNewUserWithEmailAndPassword = async (
  email,
  password,
  addInfo
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await createUserInFirestore(user, addInfo)
          .then(() => {
            window.location.href = "/ae-home-furnishing/account";
          })
          .catch((error) => {
            toast.error("Error in the registration process! Please try again.");
            console.error("Error adding user to Firestore:", error);
          });
      })
      .catch((error) => {
        if (error.message.includes("already-in-use")) {
          toast.error(
            "Email already in use! Please try again with a different email."
          );
        } else {
          toast.error("Error in the registration process! Please try again.");
        }
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const createUserInFirestore = async (user, addInfo) => {
  const userRef = doc(db, "users", user.uid);
  const userData = {
    id: user.uid,
    email: user.email,
    user_type: "user",
    deleted: false,
    createdAt: new Date(),
    username: addInfo.username || user.email.split("@")[0],
    first_name: addInfo.firstName || "None",
    last_name: addInfo.lastName || "None",
    contact_number: addInfo.contactNumber || "None",
    birthday: addInfo.birthday || "None",
    address: addInfo.address || "None",
  };

  try {
    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error adding user data to Firestore:", error);
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    const foundUser = findUserByEmail(user.email);

    return { user, foundUser };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  const usersRef = collection(db, "users");
  const query = await getDocs(usersRef);
  const users = [];
  query.forEach((doc) => {
    users.push(doc.data());
  });
  const user = users.find((u) => u.email === email);
  return user;
};

export default service;
