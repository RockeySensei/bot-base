const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te responderé con Pong y el tiempo de respuesta."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const start = Date.now();
    
    await interaction.reply({ content: 'Pinging...', ephemeral: true });

    const latency = Date.now() - start;

    await interaction.editReply({
      content: `🏓 Pong! Latencia: ${latency}ms`,
    });
  },
};
