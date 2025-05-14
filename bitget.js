import crypto from "crypto";
import axios from "axios";

const ts = Date.now();
const BASE_URL = "https://api.bitget.com";
const API_KEY = "bg_e9168e5a18f0df7b9138984543b4df4e";
const SECRET_KEY =
  "776a88db6706e2eb7711a65bc40a6456d1078f2073b36763976cd190b88119e3";

const getData = async (path, query = "") => {
  const body = ""; // Kosong untuk GET
  const message = ts + "GET" + path + query;

  // Generate signature

  // const signature = crypto.HmacSHA256(message, SECRET_KEY).toString();
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(message)
    .digest("Base64");

  console.log(message);
  console.log(signature);
  // Header
  const headers = {
    "ACCESS-KEY": API_KEY,
    "ACCESS-PASSPHRASE": "irvan13699",
    "ACCESS-SIGN": signature,
    "ACCESS-TIMESTAMP": ts,
    locale: "en-US",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(BASE_URL + path, {
      headers,
    });
    console.log("sukses");
    return response;
  } catch (error) {
    console.log("error");

    // console.log("Response Error:", error);
    if (error.response) {
      console.log("Response Error:", error.response.data.msg);
    } else {
      console.log("Network/System Error:", error.message);
    }
  }
};

const path = "/api/v2/mix/position/all-position?";
const month = ts - 7 * 24 * 60 * 60 * 1000;
const params = { startTime: month, endTime: ts };
// const query = `startTime=${params.startTime}&endTime=${params.endTime}`;
const query = "productType=USDT-FUTURES";

(async () => {
  const data = await getData(path, query);
  // console.log(data); // Tampilkan data setelah mendapatkan hasil
})();
