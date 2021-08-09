import { Message } from "discord.js";
import { ADiscordCommand } from "../commands.interface";

class PingCommand extends ADiscordCommand {
  constructor() {
    super({ label: "ping", argumentLength: 0 });
  }

  execute(args: string[], message: Message): boolean {
    message.reply("Pong!");
    return true;
  }
}

export default new PingCommand();
