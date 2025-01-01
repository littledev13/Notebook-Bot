// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbOWdUCHGdb5ilsmG7NmbrhdGDmnzmgys",
    authDomain: "bot-tele-7e97e.firebaseapp.com",
    projectId: "bot-tele-7e97e",
    storageBucket: "bot-tele-7e97e.appspot.com",
    messagingSenderId: "259988793233",
    appId: "1:259988793233:web:0d931194b9d42b2ba11c30",
    measurementId: "G-4Q9Q8WXC83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

const get = async e => {
    try {
        const dataRef = collection(db, e); // Referensi ke dokumen
        const docSnap = await getDocs(dataRef); // Mendapatkan dokumen
       
        if (!docSnap.empty) {
            docSnap.forEach(prop => {
                console.log(prop.id, " : ", prop.data());
            });
        } else {
            console.log("Dokumen tidak ditemukan!");
        }
    } catch (error) {
        console.error("Error mendapatkan dokumen:", error);
    }
};

export { app, db, get };
