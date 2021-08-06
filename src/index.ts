import {Client} from 'discord.js';

require('dotenv').config()

const client = new Client()

client.once("ready", () => {
    console.log("Armed and ready!")
});

client.login(process.env.BOT_TOKEN).then(() => {
    console.log("Logged in!")
})