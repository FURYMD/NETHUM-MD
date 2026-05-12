const { cmd, commands } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook", "fbdownload"],
    react: "✅",
    desc: "Download Facebook Video",
    category: "download",
    filename: __filename,
  },
  async (
    nethum,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a valid Facebook video URL!* ❤️");

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q))
        return reply("*Invalid Facebook URL! Please check and try again.* ☹️");

      reply("*Downloading your video...* ❤️");

      const result = await getFbVideoInfo(q);
      if (!result || (!result.sd && !result.hd)) {
        return reply("*Failed to download video. Please try again later.* ☹️");
      }

      const { title, sd, hd } = result;
      const bestQualityUrl = hd || sd;
      const qualityText = hd ? "HD" : "SD";

      const desc = `
Your fb video
👻 *Title*: ${title || "Unknown"}
👻 *Quality*: ${qualityText}
`;

      await nethum.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/FURYMD/NETHUM-MD/blob/main/images/ChatGPT%20Image%20May%2012,%202026,%2003_46_11%20PM.png?raw=true",
          },
          caption: desc,
        },
        { quoted: mek }
      );

      await nethum.sendMessage(
        from,
        {
          video: { url: bestQualityUrl },
          caption: `*📥 Downloaded in ${qualityText} quality*`,
        },
        { quoted: mek }
      );

      return reply("Thank you for using nethum-MD");
    } catch (e) {
      console.error(e);
      reply(`*Error:* ${e.message || e}`);
    }
  }
);
