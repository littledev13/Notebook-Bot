const onInputText = (msg, bot, ...params) => {
  // TODO Variabel
  const chatId = msg.chat.id;
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ["Balance  💵"],
        ["History 📜"],
        ["Trade 💼"],
        ["Statistik 📊"],
      ],
    }),
  };
  bot.sendMessage(chatId, "Pilih Menu:", opts);
};

export { onInputText };
