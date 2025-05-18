// TODO Import
import TelegramBot from "node-telegram-bot-api";
import express from "express";
const app = express();
import { get, gets, postTrade } from "./firebase.js";
import { onInputText } from "./controller.js";
import { message, callBack } from "./callback.js";
import dotenv from "dotenv";
import { eventsDaily, eventsWeekly } from "./fetchEconomicCalender.js";

dotenv.config();

// TODO Variable
console.clear();
const token = process.env.TOKEN_BOT_TELE;
const bot = new TelegramBot(token, { polling: true });
// * Code
// TODO input
bot.onText(/\/menu$/i, (msg) => {
  onInputText(msg, bot);
});
bot.on("message", (e) => {
  message(e, bot);
});
bot.on("callback_query", (callbackQuery) => {
  callBack(callbackQuery, bot);
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, (pre) => console.log("Server Tele running... "));

// console.log("Bot-tele Running...");
// //!! 1 atau 3 String dalam object
// const data2 = await gets(["Balance", "Deposit", "history"]);

// // postTrade({ Total: 40, Type: "Deposit" }, ["Balance", "Deposit", "history"]);
// const timestamp = 1736121600; // Timestamp UNIX dalam detik
// const dateUTC = new Date(timestamp * 1000); // Konversi ke milidetik

// // Format waktu ke zona waktu GMT+7 (Waktu Indonesia Barat)
// const options = {
//   timeZone: "Asia/Jakarta", // GMT+7
//   year: "numeric",
//   month: "long",
//   day: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
// };

// const dateInGMT7 = new Intl.DateTimeFormat("id-ID", options).format(dateUTC);
app();
export { app };
