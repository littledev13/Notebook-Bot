const onInputText = (msg, bot, ...params) => {
  // TODO Variabel
  const chatId = msg.chat.id;
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

  // Kirim pesan dengan tombol inline
  bot.sendMessage(chatId, "Pilih Menu  : ", opts);
};

export { onInputText };
