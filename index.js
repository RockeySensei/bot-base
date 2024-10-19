const { Client, Partials, Collection } = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");

client.events = new Collection();
client.commands = new Collection();
client.menus = new Collection();
client.buttons = new Collection();
client.prefixs = new Collection();

const { loadEvents } = require("./Handlers/eventHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { loadbMenus } = require("./Handlers/menuHandler");

loadEvents(client);
loadButtons(client);
loadbMenus(client);

client.on("messageCreate", async (message) => {
  if (message.type === 19 || message.author.bot) return;

  if (message.mentions.users.size > 0) {
    const mentionedMember = message.mentions.members.first();
    const role = message.guild.roles.cache.get("1060736300442996746");

    if (mentionedMember.roles.cache.has(role.id)) {
      return message.reply({
        content: `Este usuario tiene el rol **NO PING**, evita mencionarle.`,
        ephemeral: true,
      });
    }
  }
});

require("./Handlers/anti-crash")(client);

client.login(client.config.token)
