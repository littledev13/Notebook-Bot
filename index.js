// TODO Import
import TelegramBot from "node-telegram-bot-api";
import { get, postTrade } from "./firebase.js";
import { onInputText } from "./controller.js";
import message from "./callback.js";

// TODO Variable
const token = "7869224045:AAGQns3-FQuCJiGyA3vpDcIcUiu8VGHWcNc";
const bot = new TelegramBot(token, { polling: true });
// * Code
// TODO input
bot.onText(/\/menu$/i, (msg) => {
  onInputText(msg, bot);
});
bot.on("message", (e) => {
  message(e, bot);
});

console.clear();
console.log("Bot-tele Running...");
//!! 1 atau 3 String dalam object
const data2 = await get(["Trade"]);
const data = { lot: 0.03, pair: "BTCUSD".toUpperCase(), pnl: 21.2, win: true };
console.log(data2);

// postTrade(data);
