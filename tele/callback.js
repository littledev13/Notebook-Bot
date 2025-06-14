import { eventsDaily, eventsWeekly } from "../widget/fetchEconomicCalender.js";
import { get, postTrade } from "../firebase/firebase.js";
import { getData } from "../bitget/bitget.js";
import { balance, position } from "../bitget/pathApi.js";

let trade = {};
const userStates = { Type: "Trade" };

const message = async (msg, bot) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (userStates[chatId]) {
    const currentStep = userStates[chatId].step;
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
  let message = "";

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
      const balance2 = await getData(balance);

      function formatTelegramMessage(data) {
        let totalBalance = data.reduce(
          (acc, account) => acc + parseFloat(account.usdtBalance),
          0
        );
        const message = `*Total Balance* : ${totalBalance.toFixed(2)} USDT${data
          .map(
            (account) =>
              `\n• ${
                account.accountType.charAt(0).toUpperCase() +
                account.accountType.slice(1)
              }: ${parseFloat(account.usdtBalance).toFixed(2)} USDT`
          )
          .join("")}`;

        return message;
      }
      console.log(balance2);
      // message = formatTelegramMessage(balance2.data);
      // bot.sendMessage(chatId, message);
      // message = "";
      break;
    case "News":
      bot.sendMessage(chatId, "On Update : https://sslecal2.investing.com/");
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
    case "newsDaily":
      (async () => {
        await bot.sendMessage(chatId, "*Daily News*\n", {
          parse_mode: "Markdown",
        });

        for (const e of eventsDaily) {
          await bot.sendMessage(
            chatId,
            `📊 *${e.name}* 📊\n
      🔹 *Currency:* ${e.currency}
      🔹 *Country:* ${e.country}
      ⭐ *Importance:* ${e.importance}
      📈 *Previous:* ${e.previous}
      📊 *Forecast:* ${e.forecast}
      ✅ *Actual:* _${e.actual || "N/A"}_
      ⏰ *Time:* ${e.time}\n`,
            { parse_mode: "Markdown" }
          );
        }
        await bot.sendMessage(
          chatId,
          `Total news: ${eventsDaily.length}\nStay informed and trade wisely! 💹\n*‼️Time +2H*`,
          { parse_mode: "Markdown" }
        );
      })();
    case "newsWeekly":
      (async () => {
        const event = await eventsWeekly;
        console.log(event);
        await bot.sendMessage(chatId, "*Weekly News*\n", {
          parse_mode: "Markdown",
        });

        for (const e of event) {
          await bot.sendMessage(
            chatId,
            `📊 *${e.name}* 📊\n
      🔹 *Currency:* ${e.currency}
      🔹 *Country:* ${e.country}
      ⭐ *Importance:* ${e.importance}
      📈 *Previous:* ${e.previous}
      📊 *Forecast:* ${e.forecast}
      ✅ *Actual:* _${e.actual || "N/A"}_
      ⏰ *Time:* ${e.time}\n`,
            { parse_mode: "Markdown" }
          );
        }
        await bot.sendMessage(
          chatId,
          `Total news: ${event.length}\nStay informed and trade wisely! 💹\n*‼️Time +2H*`,
          { parse_mode: "Markdown" }
        );
      })();
      break;
    case "position":
      const position2 = await getData(position, "productType=USDT-FUTURES");
      position2.data.map((a) => {
        bot.sendMessage(
          chatId,
          `Pair : ${a.symbol} x${a.leverage}\nBuy/Sell :${a.holdSide}\nMargin : ${a.marginSize}\nPnL : ${a.unrealizedPL}\nFee : ${a.deductedFee}`
        );
      });
      break;
      ``;
    default:
      bot.answerCallbackQuery(callbackQuery.id, { text: "Unknown action." });
  }
};

export { message, callBack };
