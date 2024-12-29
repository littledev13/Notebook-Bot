// TODO Import
const TelegramBot = require("node-telegram-bot-api");
const fb = require("./firebase.js");
const {
  onInputText,
  onRiwayatText,
  onStatistikText,
  onCsvText,
} = require("./controller.js");
const message = require("./callback.js");

// TODO Variable
const token = "7869224045:AAGQns3-FQuCJiGyA3vpDcIcUiu8VGHWcNc";
const bot = new TelegramBot(token, { polling: true });
const userSteps = {};

// * Code
// TODO input
bot.onText(/\/input$/i, (msg) => {
  onInputText(msg, bot);
});

// TODO Riwayat
bot.onText(/\/riwayat$/i, (msg) => {
  onRiwayatText(msg, bot);
});
// TODO Statistik
bot.onText(/\/statistik$/i, (msg) => {
  onStatistikText(msg, bot);
});
// TODO CSV
bot.onText(/\/csv$/i, (msg) => {
  onCsvText(msg, bot);
});

// Call back
bot.on("message", (msg) => {
  message(msg, bot, userSteps);
});
console.log("Bot-tele Running...");
