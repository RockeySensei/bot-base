const { EmbedBuilder, WebhookClient } = require('discord.js');
const { inspect } = require('util');

const webhook = new WebhookClient({
  url: "URL DE WEBHOOK",
});

module.exports = (client) => {
  const createEmbed = (title, url, fields) => {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(title)
      .setURL(url)
      .setTimestamp();

    if (fields) {
      embed.addFields(fields);
    }

    return embed;
  };

  client.on("error", (err) => {
    console.error(err);
    const embed = createEmbed(
      "Discord API Error",
      "https://discordjs.guide/popular-topics/errors.html#api-errors",
      [{ name: "Details", value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` }]
    );
    webhook.send({ embeds: [embed] });
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error(reason, "\n", promise);
    const embed = createEmbed(
      "Unhandled Rejection/Catch",
      "https://nodejs.org/api/process.html#event-unhandledrejection",
      [
        { name: "Reason", value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        { name: "Promise", value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\`` },
      ]
    );
    webhook.send({ embeds: [embed] });
  });

  process.on("uncaughtException", (err, origin) => {
    console.error(err, "\n", origin);
    const embed = createEmbed(
      "Uncaught Exception",
      "https://nodejs.org/api/process.html#event-uncaughtexception",
      [
        { name: "Error", value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        { name: "Origin", value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` },
      ]
    );
    webhook.send({ embeds: [embed] });
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error(err, "\n", origin);
    const embed = createEmbed(
      "Uncaught Exception Monitor",
      "https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor",
      [
        { name: "Error", value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        { name: "Origin", value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` },
      ]
    );
    webhook.send({ embeds: [embed] });
  });

  // Manejar advertencias
  process.on("warning", (warn) => {
    console.warn(warn);
    const embed = createEmbed(
      "Warning",
      "https://nodejs.org/api/process.html#event-warning",
      [{ name: "Warning", value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\`` }]
    );
    webhook.send({ embeds: [embed] });
  });
};
