const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "NQNDTYqC#jhCSYTxfsHxiLs-QssOEGUikkt61tnI8nX_73RPUCgc",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/FURYMD/NETHUM-MD/blob/main/images/alive.png?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 NETHUM-MD Is Alive Now😍*",
BOT_OWNER: '94721640007',  // Replace with the owner's phone number
AUTO_STATUS_SEEN: 'true',
AUTO_STATUS_REACT: 'true',
ANTI_DELETE: 'true',


};
