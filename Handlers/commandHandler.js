async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  const commandsArray = [];

  const files = await loadFiles("Commands");

  files.forEach((file) => {
    const command = require(file);
    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

    table.addRow(command.data.name, "🟩");
  });
  await client.application.commands.set(commandsArray);

  console.log(table.toString(), "\n✅ Comandos Cargados.");
}

module.exports = { loadCommands };
