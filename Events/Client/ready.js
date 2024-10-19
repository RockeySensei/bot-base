const { ActivityType } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadPrefixs } = require("../../Handlers/prefixHandler");
const config = require("../../config.json");
const mongoose = require("mongoose");

const mongoDBURL = config.mongopass;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("🚀 El cliente se ha iniciado");

    if (!mongoDBURL) {
      console.error("❌ URL de MongoDB no proporcionada.");
      return;
    }

    try {
      await mongoose.connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Conectado a la base de datos con éxito");
    } catch (error) {
      console.error(`❌ Error al conectar a la base de datos: ${error.message}`);
      return;
    }

    client.user.setPresence({
      activities: [
        {
          name: "VMStore",
          type: ActivityType.Watching,
        },
      ],
      status: "online", // Opcional: Puedes establecer el estado como "online", "idle", "dnd" o "invisible"
    });

    loadCommands(client);
    loadPrefixs(client);
    console.log("🔧 Comandos y prefijos cargados correctamente");
  },
};
