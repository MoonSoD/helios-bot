import { Message } from "discord.js";
import { ADiscordCommand } from "../commands.interface";
import { resolveUser } from "../../../util/users";

class PingCommand extends ADiscordCommand {
  constructor() {
    super({
      label: "ping",
      usage: "ping (user)",
      description: "Ping!",
      argumentLength: { min: 0, max: 1 },
    });
  }

  execute(args: string[], message: Message): boolean {
    if (args?.[0]) {
      const user = resolveUser(args[0]);
      message.channel.send(`Pong, ${user?.tag}`);
    } else {
      message.reply(`Pong!`);
    }

    return true;
  }
}

export default new PingCommand();
