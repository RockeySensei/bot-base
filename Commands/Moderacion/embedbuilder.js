const {
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  TextInputBuilder,
  ModalBuilder,
  TextInputStyle,
  ChannelType,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embedbuilder")
    .setDescription("Envia un embed personalizado")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addChannelOption(option =>
      option
        .setName("canal")
        .setDescription("Canal donde enviar el embed")
        .addChannelTypes(ChannelType.GuildText)
    ),

  async execute(interaction) {
    const channelId = interaction.options.getChannel("canal")?.id || "0";

    const modal = new ModalBuilder()
      .setCustomId(`embedbuilder-${channelId}`)
      .setTitle("Embed Builder")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embedtitulo")
            .setLabel("Título (requerido)")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(256)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embeddecripcion")
            .setLabel("Descripción (requerido)")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(4000)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embedimagen")
            .setLabel("Imagen URL")
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(256)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embedthumbnail")
            .setLabel("Thumbnail URL")
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(256)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embedfooter")
            .setLabel("Footer")
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(2048)
        )
      );

    await interaction.showModal(modal);
  },

  // Manejador para cuando el modal se envía
  async handleModal(interaction) {
    const title = interaction.fields.getTextInputValue("embedtitulo");
    const description = interaction.fields.getTextInputValue("embeddecripcion");

    // Comprobar campos requeridos
    if (!title || !description) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("⚠️ Por favor, completa todos los campos requeridos."),
        ],
        ephemeral: true,
      });
      return;
    }

    const channelId = interaction.customId.split("-")[1];
    const channel = interaction.guild.channels.cache.get(channelId);

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor("Blue");

    // Opcional: agregar otros campos del modal al embed aquí

    await channel.send({ embeds: [embed] });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setDescription("✅ Tu Embed se envió correctamente."),
      ],
      ephemeral: true,
    });
  },
};
