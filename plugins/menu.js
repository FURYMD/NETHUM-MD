const { cmd, commands } = require("../command");

const pendingMenu = {};

const numberEmojis = [
  "0️⃣","1️⃣","2️⃣","3️⃣","4️⃣",
  "5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"
];

const headerImage =
  "https://github.com/FURYMD/NETHUM-MD/blob/main/images/alive.png?raw=true";

cmd({
  pattern: "menu",
  react: "📂",
  desc: "Show all command categories",
  category: "main",
  filename: __filename
},
async (test, m, msg, { from, sender }) => {

  const commandMap = {};

  for (const command of commands) {
    if (command.dontAddCommandList) continue;

    const category = (command.category || "misc").toUpperCase();

    if (!commandMap[category]) {
      commandMap[category] = [];
    }

    commandMap[category].push(command);
  }

  const categories = Object.keys(commandMap);

  let menuText = `
╭━━〔 *🌸 NETHUM-MD MENU 🌸* 〕━━⬣
┃ ✦ User : @${sender.split("@")[0]}
┃ ✦ Prefix : .
┃ ✦ Mode : Public
╰━━━━━━━━━━━━━━⬣

╭━━〔 *📂 COMMAND LIST* 〕━━⬣
`;

  categories.forEach((cat, i) => {
    const emoji =
      numberEmojis[i + 1] || "✨";

    menuText += `┃ ${emoji} ${cat}\n`;
    menuText += `┃     ╰➤ ${commandMap[cat].length} Commands\n`;
  });

  menuText += `╰━━━━━━━━━━━━━━⬣
> Reply With Category Number`;

  await test.sendMessage(
    from,
    {
      image: { url: headerImage },
      caption: menuText,
      mentions: [sender]
    },
    { quoted: m }
  );

  pendingMenu[sender] = {
    step: "category",
    commandMap,
    categories
  };
});

cmd({
  filter: (text, { sender }) =>
    pendingMenu[sender] &&
    pendingMenu[sender].step === "category" &&
    /^[1-9][0-9]*$/.test(text.trim())
},
async (test, m, msg, { from, body, sender, reply }) => {

  const data = pendingMenu[sender];

  if (!data) return;

  const { commandMap, categories } = data;

  const index = parseInt(body.trim()) - 1;

  if (index < 0 || index >= categories.length) {
    return reply("❌ Invalid Category Number");
  }

  const selectedCategory = categories[index];
  const cmdsInCategory = commandMap[selectedCategory];

  let cmdText = `
╭━━〔 *${selectedCategory} MENU* 〕━━⬣
┃ ✦ Total Commands : ${cmdsInCategory.length}
╰━━━━━━━━━━━━━━⬣

`;

  cmdsInCategory.forEach((c, i) => {

    const patterns = [
      c.pattern,
      ...(c.alias || [])
    ]
      .filter(Boolean)
      .map(p => `.${p}`)
      .join(", ");

    cmdText += `
╭─❍
┃ ${numberEmojis[(i + 1)] || "✨"} ${patterns}
┃ 💬 ${c.desc || "No Description"}
╰──────────────❍
`;
  });

  cmdText += `\n> 🌸 Powered By NETHUM-MD`;

  await test.sendMessage(
    from,
    {
      image: { url: headerImage },
      caption: cmdText
    },
    { quoted: m }
  );

  delete pendingMenu[sender];
});
