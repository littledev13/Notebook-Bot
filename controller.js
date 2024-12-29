const onInputText = (msg, bot) => {
  //   console.log("msg : " + msg);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Input");
};
const onRiwayatText = (msg, bot) => {
  const chatId = msg.chat.id;
  //   const opts = {
  //     reply_to_message_id: message_id,
  //     reply_markup: JSON.stringify({
  //       keyboard: [
  //         ["Yes, you are the bot of my life ❤"],
  //         ["No, sorry there is another one..."],
  //       ],
  //     }),
  //   };

  bot.sendMessage(chatId, "Riwayat");
};
const onCsvText = (msg, bot) => {
  const chatId = msg.chat.id;
  //   const opts = {
  //     reply_to_message_id: message_id,
  //     reply_markup: JSON.stringify({
  //       keyboard: [
  //         ["Yes, you are the bot of my life ❤"],
  //         ["No, sorry there is another one..."],
  //       ],
  //     }),
  //   };

  bot.sendMessage(chatId, "CSV");
};
const onStatistikText = (msg, bot) => {
  const chatId = msg.chat.id;
  //   const opts = {
  //     reply_to_message_id: message_id,
  //     reply_markup: JSON.stringify({
  //       keyboard: [
  //         ["Yes, you are the bot of my life ❤"],
  //         ["No, sorry there is another one..."],
  //       ],
  //     }),
  //   };

  bot.sendMessage(chatId, "Statistik?");
};

module.exports = { onInputText, onRiwayatText, onCsvText, onStatistikText };
