import crypto from "crypto-js";
import dotenv from "dotenv";
import axios from "axios";
import https from "https";

//
dotenv.config();

//

// 1. Buat pesan
// const message = ts + method + path + body;

// 2. Generate signature
// const signature = crypto.HmacSHA256(message, secretKey).toString();

async function getBalance() {
  const ts = Date.now();
  const BASE_URL = "https://api.bitget.com";
  const API_KEY = process.env.publicKey;
  const SECRET_KEY = process.env.privKey;
  const method = "GET";
  const path = "/api/v2/account/all-account-balance";
  const body = ""; // Kosong untuk GET
  const message = ts + method.toUpperCase() + path;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  // Generate signature
  const signature = crypto.HmacSHA256(message, SECRET_KEY).toString();

  // Header
  const headers = {
    "ACCESS-KEY": API_KEY,
    "ACCESS-SIGN": signature,
    "ACCESS-PASSPHRASE": "irvan13699",
    "ACCESS-TIMESTAMP": ts,
    locale: "en-US",
    "Content-Type": "application/json",
  };

  // Request
  try {
    const response = await axios.get(BASE_URL + path, { headers, httpsAgent });
    console.log(response.data);
    console.log("sukses");
  } catch (error) {
    console.error("Response Error:", error.response.data);
    console.log("error nns");

    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else {
      console.error("Network/System Error:", error.message);
    }
  }
}

getBalance();

// const ts = Date.now();
// const BASE_URL = "https://api.bitget.com";
// const API_KEY = process.env.publicKey;
// const SECRET_KEY = process.env.privKey;
// const method = "GET";
// const path = "/api/v2/account/all-account-balance";
// const body = ""; // Kosong untuk GET
// const message = ts + method + path;
// const signature = crypto.HmacSHA256(message, SECRET_KEY).toString();
// console.log(signature);
