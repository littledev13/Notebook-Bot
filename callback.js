import { get, postTrade } from "./firebase.js";

let trade = {};
const userStates = { Type: "Trade" };

const message = async (msg, bot) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (userStates[chatId]) {
    const currentStep = userStates[chatId].step;
    // console.log(currentStep);

    switch (currentStep) {
      case "askLot":
        if (trade.pair == undefined) {
          bot.sendMessage(chatId, "Harap Pilih Pair!!!");
          break;
        }
        const number1 = parseFloat(text);
        if (isNaN(number1)) {
          bot.sendMessage(chatId, "Masukan angka valid!!!");
          break;
        }
        trade.lot = text;
        bot.sendMessage(chatId, "Win ?", {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Win ✅", callback_data: "winTrade" },
                { text: "BEP 💩", callback_data: "loseTrade" },
                { text: "Lose ❌", callback_data: "loseTrade" },
              ],
            ],
          },
        });
        break;
      case "askPnl":
        if (
          trade.pair == undefined &&
          trade.lot == undefined &&
          trade.win == undefined
        ) {
          bot.sendMessage(chatId, "Harap Pilih Win/Lose!!!");
          break;
        }
        const number = parseFloat(text);
        if (isNaN(number)) {
          bot.sendMessage(chatId, "Masukan angka valid!!!");
          break;
        }
        trade.pnl = text;
        bot.sendMessage(
          chatId,
          `Pair : ${trade.pair} \nLot  : ${trade.lot} \nWin : ${
            trade.win ? "Win" : "Lose"
          } \nPnl  : ${trade.pnl}`,
          {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "Save ✅", callback_data: "saveTrade" },
                  { text: "Cancel ❌", callback_data: "cancelTrade" },
                ],
              ],
            },
          }
        );
        break;
      default:
        break;
    }
  }
};

const callBack = async (callbackQuery, bot) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  switch (data) {
    case "Trade":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      bot.sendMessage(chatId, "Pilih Pair :", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "XAUUSD", callback_data: "XAUUSD" },
              { text: "BTCUSD", callback_data: "BTCUSD" },
            ],
          ],
        },
      });
      break;
    case "BTCUSD":
    case "XAUUSD":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      userStates[chatId] = { step: "askLot" };
      bot.sendMessage(chatId, "Berapa Lot : ");
      trade.pair = callbackQuery.data;

      break;

    case "Balance":
      const data = await get(["Balance", "Summary"]);
      const opts = {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Trade 💼", callback_data: "Trade" },
              { text: "Balance  💵", callback_data: "Balance" },
              { text: "News 📰", callback_data: "News" },
            ],
            [
              { text: "Statistik 📊", callback_data: "Statistik" },
              { text: "History 📜", callback_data: "History" },
            ],
          ],
        },
      };
      const message = `*Balance* : ${data.Balance} USC\n*Deposit* : ${data["Total Deposit"]} USC\n*Withdraw* : ${data["Total Withdraw"]} USC`;

      // Kirim pesan dengan tombol inline
      bot.sendMessage(chatId, message, opts);
      break;
    case "News":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      bot.sendMessage(chatId, "Pilih Pair :", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "XAUUSD", callback_data: "XAUUSD" },
              { text: "BTCUSD", callback_data: "BTCUSD" },
              { text: "EURUSD", callback_data: "EURUSD" },
            ],
          ],
        },
      });
      break;
    case "History":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      bot.sendMessage(chatId, "Pilih Pair :", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "XAUUSD", callback_data: "XAUUSD" },
              { text: "BTCUSD", callback_data: "BTCUSD" },
              { text: "EURUSD", callback_data: "EURUSD" },
            ],
          ],
        },
      });
      break;
    case "Statistik":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      bot.sendMessage(chatId, "Pilih Pair :", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "XAUUSD", callback_data: "XAUUSD" },
              { text: "BTCUSD", callback_data: "BTCUSD" },
              { text: "EURUSD", callback_data: "EURUSD" },
            ],
          ],
        },
      });
      break;
    case "loseTrade":
    case "winTrade":
      if (trade.pair == undefined && trade.lot == undefined) {
        bot.sendMessage(chatId, "Harap Masukan Lot!!!");
        break;
      }
      trade.win = callbackQuery.data == "winTrade" ? true : false;
      bot.sendMessage(chatId, "Pnl :");
      userStates[chatId] = { step: "askPnl" };
      break;
    case "saveTrade":
      if (Object.keys(trade).length == 0) {
        bot.sendMessage(
          chatId,
          "*Please*!!! Trade > [Pair] > [Lot] > [w/l] > [pnl]!!"
        );
        trade = [];
        break;
      }
      console.log(trade);

      postTrade(trade, ["Trade"]);
      bot.sendMessage(chatId, "Trade Berhasil Disimpan!!");
      trade = [];
      break;
    case "cancelTrade":
      trade = [];
      bot.sendMessage(
        chatId,
        "Tekan tombol di bawah ini untuk mengirimkan perintah /menu.",
        {
          reply_markup: {
            keyboard: [["/menu"]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        }
      );
      break;
    default:
      bot.answerCallbackQuery(callbackQuery.id, { text: "Unknown action." });
  }
};

export { message, callBack };
