const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  PermissionsBitField,
  ModalSubmitInteraction,
  InteractionType,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ModalSubmitInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.type == InteractionType.ModalSubmit) {
      const splittedArray = interaction.customId.split(`-`);
      if (splittedArray[0] !== `embedbuilder`) return;

      const titulo = interaction.fields.getTextInputValue("embedtitulo");
      const descripcion =
        interaction.fields.getTextInputValue("embeddecripcion");
      const imagen = interaction.fields.getTextInputValue("embedimagen");
      const thumbnail = interaction.fields.getTextInputValue("embedthumbnail");
      const footer = interaction.fields.getTextInputValue("embedfooter");

      const embed = new EmbedBuilder();

      if (imagen) {
        try {
          embed.setImage(imagen);
        } catch (error) {
          return interaction.reply({
            content: `❌ Algo salio mal al agregar la imagen, comprueba que la url sea funcional.`,
            ephemeral: true,
          });
        }
      } else {
      }

      if (thumbnail) {
        try {
          embed.setThumbnail(thumbnail);
        } catch (error) {
          return interaction.reply({
            content: `❌ Algo salio mal al agregar la miniatura, comprueba que la url sea funcional.`,
            ephemeral: true,
          });
        }
      } else {
      }

      if (titulo) {
        embed.setTitle(titulo);
      } else {
      }

      if (descripcion) {
        embed.setDescription(descripcion);
      } else {
      }

      if (footer) {
        embed.setFooter({ text: footer });
      } else {
      }

      if (splittedArray[1] === "0") {
        await interaction.channel.send({ embeds: [embed] });
      } else {
        await interaction.guild.channels.cache
          .get(splittedArray[1])
          .send({ embeds: [embed] });
      }

      await interaction.reply({
        content: `El embed se envio correctamente`,
        ephemeral: true,
      });
    } else {
      return;
    }
  },
};
