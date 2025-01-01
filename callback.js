import { get } from "./firebase.js";

const message = async (msg, bot) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(text);

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
};
export default message;
