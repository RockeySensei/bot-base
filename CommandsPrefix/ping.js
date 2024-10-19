const { Message } = require("discord.js");

module.exports = {
    name: "ping",

    async execute(message, args) {
        const start = Date.now();

        const replyMessage = await message.channel.send("Pinging...");

        const latency = Date.now() - start;

        await replyMessage.edit(`🏓 Pong! Latencia: ${latency}ms`);
    }
};
