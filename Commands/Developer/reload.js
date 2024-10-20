const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require(`discord.js`);

const { loadCommands } = require(`../../Handlers/commandHandler`);
const { loadEvents } = require(`../../Handlers/eventHandler`);
const { loadButtons } = require(`../../Handlers/buttonHandler`);

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName(`reload`)
    .setDescription(`Recarga tus comanods/eventos`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addSubcommand((options) =>
      options.setName(`events`).setDescription(`Recarga tus eventos`)
    )
    .addSubcommand((options) =>
      options.setName(`commands`).setDescription(`Recarga tus comandos`)
    )
    .addSubcommand((options) =>
      options.setName(`buttons`).setDescription(`Recarga tus botones`)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({
            content: `Tus eventos fueron recargados correctamente`,
            ephemeral: true,
          });
        }

        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({
            content: `Tus comandos fueron recargados`,
            ephemeral: true,
          });
        }
        break;
      case "buttons":
        {
          loadButtons(client);
          interaction.reply({
            content: `Tus botones fueron recargados`,
            ephemeral: true,
          });
        }
        break;
    }
  },
};
