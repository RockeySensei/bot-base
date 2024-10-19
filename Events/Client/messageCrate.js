const { Message, EmbedBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   *
   * @param {Message} message
   */
  async execute(message, client) {
    const prefix = config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd = client.prefixs.get(command) || client.prefixs.find((cmd) => command.aliases && cmd.aliases.includes(command));

    if (!cmd) return;
    
    cmd.execute(message, args);
  },
};
