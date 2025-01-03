// TODO Import
import TelegramBot from "node-telegram-bot-api";
import { get, gets, postTrade } from "./firebase.js";
import { onInputText } from "./controller.js";
import { message, callBack } from "./callback.js";
import dotenv from "dotenv";

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

console.log("Bot-tele Running...");
//!! 1 atau 3 String dalam object
const data2 = await gets(["Trade"]);

// console.log(data2);

// postTrade(data);
