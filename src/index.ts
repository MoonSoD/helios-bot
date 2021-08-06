import {Client} from 'discord.js';

const client = new Client()

client.once("ready", () => {
    console.log("Armed and ready!")
});

client.login("")