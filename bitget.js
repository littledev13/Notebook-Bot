import crypto from "crypto";
import axios from "axios";

const ts = Date.now();
const BASE_URL = "https://api.bitget.com";
const API_KEY = "bg_e9168e5a18f0df7b9138984543b4df4e";
const SECRET_KEY =
    "776a88db6706e2eb7711a65bc40a6456d1078f2073b36763976cd190b88119e3";

const getData = async (path, query = "") => {
    const message = ts + "GET" + path + (query ? "?" + query : "");

    const signature = crypto
        .createHmac("sha256", SECRET_KEY)
        .update(message)
        .digest("Base64");
    const headers = {
        "ACCESS-KEY": API_KEY,
        "ACCESS-PASSPHRASE": "irvan13699",
        "ACCESS-SIGN": signature,
        "ACCESS-TIMESTAMP": ts,
        locale: "en-US",
        "Content-Type": "application/json"
    };
    try {
        const response = await axios.get(
            BASE_URL + path + (query ? "?" + query : ""),
            {
                headers
            }
        );
        return {
            msg: response.data.msg,
            data: response.data.data
        };
    } catch (error) {
        if (error.response) {
            console.log("Response Error:", error.response.data.msg);
        } else {
            console.log("Network/System Error:", error.message);
        }
    }
};
const tgl = hari => {
    return ts - hari * 24 * 60 * 60 * 1000;
};

(async () => {
    const data = await getData("/api/v2/account/bot-assets");
    console.log(data);
})();

export { getData, tgl };
