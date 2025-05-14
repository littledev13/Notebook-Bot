import crypto from "crypto";
import dotenv from "dotenv";
import axios from "axios";
import { Base64 } from "js-base64";

//
dotenv.config();

// const secret = "abcdefg";
// const hash = createHmac("sha256", secret)
//   .update("776a88db6706e2eb7711a65bc40a6456d1078f2073b36763976cd190b88119e3")
//   .digest("hex");
// console.log(hash);
//

// 1. Buat pesan
// const message = ts + method + path + body;

// 2. Generate signature
// const signature = crypto.HmacSHA256(message, secretKey).toString();

async function getBalance() {
  const ts = Math.round(new Date());
  const BASE_URL = "https://api.bitget.com";
  const API_KEY = "bg_e9168e5a18f0df7b9138984543b4df4e";
  const SECRET_KEY =
    "776a88db6706e2eb7711a65bc40a6456d1078f2073b36763976cd190b88119e3";
  const method = "GET";
  const path = "/api/v2/account/all-account-balance";
  const body = ""; // Kosong untuk GET
  const message = ts + method.toUpperCase() + path;

  // Generate signature

  // const signature = crypto.HmacSHA256(message, SECRET_KEY).toString();
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(message)
    .digest("Base64");

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
  console.log(signature);

  try {
    const response = await axios.get(BASE_URL + path + body, {
      headers,
    });
    console.log(response.data);
    // console.log("sukses");
  } catch (error) {
    console.error("Response Error:", error.response.data);

    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else {
      console.error("Network/System Error:", error.message);
    }
  }
}

getBalance();
