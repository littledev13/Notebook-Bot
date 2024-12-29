const message = (msg, bot, userSteps) => {
  const chatId = msg.chat.id;

  // Pastikan pengguna sedang dalam proses pengisian form

  if (userSteps[chatId] && userSteps[chatId].type == "input") {
    const currentStep = userSteps[chatId].step;

    if (currentStep === 1) {
      // Simpan nama pengguna
      userSteps[chatId].data.name = msg.text;
      userSteps[chatId].step++; // Lanjut ke langkah berikutnya
      bot.sendMessage(chatId, "How old are you?");
    } else if (currentStep === 2) {
      // Simpan usia pengguna
      const age = parseInt(msg.text, 10);
      if (isNaN(age)) {
        bot.sendMessage(chatId, "Please enter a valid number for your age.");
        return;
      }

      userSteps[chatId].data.age = age;
      userSteps[chatId].step++; // Lanjut ke langkah berikutnya
      bot.sendMessage(chatId, "What is your email?");
    } else if (currentStep === 3) {
      // Simpan email pengguna
      userSteps[chatId].data.email = msg.text;

      // Tampilkan data yang dikumpulkan
      const { name, age, email } = userSteps[chatId].data;
      bot.sendMessage(
        chatId,
        `Thank you! Here is your data:\nName: ${name}\nAge: ${age}\nEmail: ${email}`
      );

      // Hapus progres pengguna setelah selesai
      delete userSteps[chatId];
    }
  }
};
module.exports = message;
