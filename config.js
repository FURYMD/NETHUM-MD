const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "5McUyI4D#NwF3TfNY78K0Yi-8rGD7EVES0Pzw7rSgKH7pNS40fd8",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/FURYMD/NETHUM-MD/blob/main/images/ChatGPT%20Image%20May%2012,%202026,%2003_46_11%20PM.png?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 NETHUM-MD Is Alive Now😍*",
BOT_OWNER: '94721640007',  // Replace with the owner's phone number
AUTO_STATUS_SEEN: 'true',
AUTO_STATUS_REACT: 'true',



};
