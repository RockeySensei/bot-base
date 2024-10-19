const { exec } = require("child_process");

function clearConsole() {
  exec('cls', (err) => {
    if (err) {
      console.error(`No se pudo limpiar la consola: ${err}`);
    }
  });

  console.log(`\x1b[1;31m`);
  console.log(" /$$    /$$ /$$      /$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$$  /$$$$$$$$");
  console.log("| $$   | $$| $$$    /$$$ /$$__  $$|__  $$__//$$__  $$| $$__  $$| $$_____/");
  console.log("| $$   | $$| $$$$  /$$$$| $$  \\__/   | $$  | $$  \\ $$| $$  \\ $$| $$      ");
  console.log("|  $$ / $$/| $$ $$/$$ $$|  $$$$$$    | $$  | $$  | $$| $$$$$$$/| $$$$$   ");
  console.log(" \\  $$ $$/ | $$  $$$| $$ \\____  $$   | $$  | $$  | $$| $$__  $$| $$__/   ");
  console.log("  \\  $$$/  | $$\\  $ | $$ /$$  \\ $$   | $$  | $$  | $$| $$  \\ $$| $$      ");
  console.log("   \\  $/   | $$ \\/  | $$|  $$$$$$/   | $$  |  $$$$$$/| $$  | $$| $$$$$$$$");
  console.log("    \\_/    |__/     |__/ \\______/    |__/   \\______/ |__/  |__/|________/");
  console.log(`\x1b[0m`);
}

async function loadbMenus(client) {
  clearConsole();

  const { loadFiles } = require("../Functions/fileLoader");

  await client.menus.clear();

  const files = await loadFiles("Menus");

  files.forEach((file) => {
    const menu = require(file);
    client.menus.set(menu.data.name, menu);
  });

  console.log("\n✅ Menús cargados.");
}

module.exports = { loadbMenus };
