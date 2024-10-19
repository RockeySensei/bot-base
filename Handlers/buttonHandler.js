async function loadButtons(client) {
  const { loadFiles } = require("../Functions/fileLoader");

  client.buttons.clear();

  const files = await loadFiles("Buttons");

  files.forEach((file) => {
    const button = require(file);
    client.buttons.set(button.data.name, button);
  });
}

module.exports = { loadButtons };
