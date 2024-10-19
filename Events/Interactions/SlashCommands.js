const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({
          content: "Este comando está obsoleto.",
          ephemeral: true,
        });
      }

      // Verificar si el comando es exclusivo para el desarrollador
      if (command.developer && interaction.user.id !== "581878328357683251") {
        return interaction.reply({
          content: "Este comando es solo para mi creador.",
          ephemeral: true,
        });
      }

      await command.execute(interaction, client);

    } else if (interaction.isButton()) {
      const buttonId = interaction.customId.split("_");
      const button = client.buttons.get(buttonId[0]);

      if (!button) return;

      await button.execute(interaction, client, buttonId.slice(1));

    } else if (interaction.isStringSelectMenu()) {
      const menuId = interaction.customId.split("_");
      const menu = client.menus.get(menuId[0]);

      if (!menu) return;

      await menu.execute(interaction, client, menuId.slice(1));
    } else {
      return;
    }
  },
};
