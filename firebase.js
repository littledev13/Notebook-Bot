// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbOWdUCHGdb5ilsmG7NmbrhdGDmnzmgys",
  authDomain: "bot-tele-7e97e.firebaseapp.com",
  projectId: "bot-tele-7e97e",
  storageBucket: "bot-tele-7e97e.appspot.com",
  messagingSenderId: "259988793233",
  appId: "1:259988793233:web:0d931194b9d42b2ba11c30",
  measurementId: "G-4Q9Q8WXC83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

const get = async (e) => {
  try {
    const dataRef = doc(db, ...e); // Referensi ke dokumen
    const docSnap = await getDoc(dataRef); // Mendapatkan dokumen
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Dokumen tidak ditemukan!");
      return [];
    }
  } catch (error) {
    console.error("Error mendapatkan dokumen:", error);
    throw error;
  }
};
const gets = async (e) => {
  try {
    const dataRef = collection(db, ...e); // Referensi ke dokumen
    const docSnap = await getDocs(dataRef); // Mendapatkan dokumen
    const data = [];
    if (!docSnap.empty) {
      docSnap.forEach((prop) => {
        data.push({
          id: prop.id,
          data: prop.data(),
        });
      });
      return data;
    } else {
      console.log("Dokumen tidak ditemukan!");
      return [];
    }
  } catch (error) {
    console.error("Error mendapatkan dokumen:", error);
    throw error;
  }
};

// TODO Bisa Di Persingkat posttrade & write
const postTrade = async (data, ref) => {
  const tgl = new Date();
  const formattedDate = `${tgl.getDate()}-${
    tgl.getMonth() + 1
  }-${tgl.getFullYear()} : ${tgl.getHours()}.${tgl.getMinutes()}`;
  try {
    const documentRef = doc(db, ...ref, formattedDate);
    await setDoc(documentRef, data);
    const balanceRef = doc(db, "Balance", "Summary");
    await updateDoc(balanceRef, {
      Balance:
        data.Type == "Withdraw"
          ? increment(-data.Total)
          : increment(data.pnl || data.Total),
      "Total Deposit":
        data.Type == "Deposit" ? increment(data.Total) : increment(0),
      "Total Withdraw":
        data.Type == "Withdraw" ? increment(-data.Total) : increment(0),
    });

    console.log("Dokumen berhasil dibuat");
  } catch (error) {
    console.error("Error saat membuat atau memperbarui dokumen:", error);
  }
};

export { app, db, gets, get, postTrade };
