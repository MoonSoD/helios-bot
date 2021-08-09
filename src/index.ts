import "dotenv/config";
import { Client } from "discord.js";
import { registerModules } from "./modules";

export * from "./modules/index";
export * from "./modules/commands/command-registry";
export * from "./modules/commands/impl/ping-command";

export const client = new Client();

client.once("ready", () => {
  console.log("Armed and ready!");
});

client.login(process.env.BOT_TOKEN).then(() => {
  console.log("Logged in!");

  registerModules();
});
