import { get } from "./firebase.js";

const trade = [];
const userStates = {};

const message = async (msg, bot) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Pastikan pengguna sedang dalam proses pengisian form
  if (text == "Balance  💵") {
    const data = await get(["Balance"]);
    console.clear();
    console.log(data);
    const formatData = (data) => {
      let formattedMessage = "";

      data.forEach((item) => {
        formattedMessage += `*${item.id}*\n`; // Menambahkan data
        if (Object.keys(item.data).length > 0) {
          Object.keys(item.data).forEach((key) => {
            formattedMessage += `_${key}_: ${item.data[key]}\n`; // Menambahkan data
          });
        } else {
          formattedMessage += "_No data available_\n"; // Jika tidak ada data
        }
        formattedMessage += "\n"; // Menambahkan spasi antara bagian data
      });

      return formattedMessage;
    };

    // Format data menjadi string Markdown
    const message = formatData(data);
    bot.sendMessage(chatId, "*Balance* :\n" + message, {
      parse_mode: "Markdown",
    });
  }
  if (text == "History 📜") {
    const data = await get(["Trade"]);
    console.clear();
    console.log(data);
    const formatData = (data) => {
      let formattedMessage = "";

      data.forEach((item, index) => {
        formattedMessage += `*Tanggal* : ${item.id}\n`; // Menambahkan data
        if (Object.keys(item.data).length > 0) {
          Object.keys(item.data).forEach((key) => {
            formattedMessage += `*${key}* : ${item.data[key]}\n`; // Menambahkan data
          });
        } else {
          formattedMessage += "_No data available_\n"; // Jika tidak ada data
        }
      });

      return formattedMessage;
    };

    // Format data menjadi string Markdown
    const message = formatData(data);
    bot.sendMessage(chatId, "*History* :\n" + message, {
      parse_mode: "Markdown",
    });
  }
  if (text == "Trade 💼") {
    bot.sendMessage(chatId, "Trade 💼");
  }
  if (text == "Statistik 📊") {
    bot.sendMessage(chatId, "Statistik 📊");
  }
  // console.assert(first, second);
  if (userStates[chatId]) {
    const currentStep = userStates[chatId].step;
    // console.log(currentStep);

    switch (currentStep) {
      case "askLot":
        trade["lot"] = text;
        bot.sendMessage(chatId, "Win ?", {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Win ✅", callback_data: "winTrade" },
                { text: "BEP 💩", callback_data: "bepTrade" },
                { text: "Lose ❌", callback_data: "loseTrade" },
              ],
            ],
          },
        });
        break;
      case "askPnl":
        trade["pnl"] = 2.5;
        console.log(trade);
        trade = [];
        console.log(trade);
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

    case "XAUUSD":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      userStates[chatId] = { step: "askLot" };
      bot.sendMessage(chatId, "Berapa Lot : ");
      trade["pair"] = callbackQuery.data;
      console.log(trade);

      break;

    case "BTCUSD":
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Pilih Pair",
      });
      bot.sendMessage(chatId, "Berapa Lot :");
      break;
    case "Balance":
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
    case "winTrade":
      trade["win"] = true;
      bot.sendMessage(chatId, "Pnl :");
      userStates[chatId] = { step: "askPnl" };
      break;
    default:
      bot.answerCallbackQuery(callbackQuery.id, { text: "Unknown action." });
  }
};

export { message, callBack };
