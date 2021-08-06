import {Client} from 'discord.js';
import {AModule, CommandRegistry} from "./commands/command-registry";

require('dotenv').config()

export const client = new Client()

client.once("ready", () => {
    console.log("Armed and ready!")
});

const modules: AModule[] = [
    new CommandRegistry()
]

client.login(process.env.BOT_TOKEN).then(() => {
    console.log("Logged in!")
    modules.forEach(({register}) => register())
})