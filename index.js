// TODO Import
import TelegramBot from "node-telegram-bot-api";
import express from "express";
import { onInputText } from "./tele/controller.js";
import { message, callBack } from "./tele/callback.js";
import dotenv from "dotenv";

console.clear();
dotenv.config();

const app = express();
const token = process.env.TOKEN_BOT_TELE;
const bot = new TelegramBot(token, { polling: true });
const hari = new Date();

// TODO input
bot.onText(/\/menu$/i, (msg) => {
  console.log(`Tanggal sekarang: ${hari.toLocaleDateString()}`);
  console.log(`Waktu sekarang: ${hari.toLocaleTimeString()}`);
  onInputText(msg, bot);
});
bot.on("message", (e) => {
  // console.log(`Waktu sekarang: ${hari.toLocaleTimeString()}`);
  console.log(e.text);

  message(e, bot);
});
bot.on("callback_query", (callbackQuery) => {
  callBack(callbackQuery, bot);
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server Tele running... "));

export { app };
