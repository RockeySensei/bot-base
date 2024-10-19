const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "enviarembed",
  },
  async execute(interaction, client, args) {
    const channelId = args[0];
    const embed = interaction.message.embeds[0];

    const channel = interaction.guild.channels.cache.get(channelId);
    if (!channel || channel.type !== 'GUILD_TEXT') {
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor("Red").setDescription("⚠️ Canal no encontrado o no válido.")],
        ephemeral: true,
      });
    }

    try {
      await channel.send({ embeds: [embed] });
      await interaction.reply({
        embeds: [new EmbedBuilder().setColor("Green").setDescription("✅ Tu Embed se envió correctamente.")],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        embeds: [new EmbedBuilder().setColor("Red").setDescription("⚠️ Ocurrió un error al enviar el embed.")],
        ephemeral: true,
      });
    }
  },
};
