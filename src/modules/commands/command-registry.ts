import { client } from "../../index";
import { Message } from "discord.js";

import PingCommand from "./impl/ping-command";
import { ADiscordCommand, ArgumentLength } from "./commands.interface";
import { AModule } from "../module.interface";
import { match } from "assert/strict";

class CommandModule extends AModule {
  private commands: ADiscordCommand[] = [PingCommand];
  private prefix = process.env.COMMAND_PREFIX ?? "+";

  public register() {
    client.on("message", (message) => {
      if (message.content.startsWith(this.prefix)) {
        this.handleCommand(message);
      }
    });
  }

  private async handleCommand(message: Message) {
    const parsedInput = message.content
      .substring(1)
      .toLowerCase()
      .trim()
      .split(" ");

    const inputCommandLabel = parsedInput.shift();

    const matchedCommand = this.commands.find(
      (command) => command?.options?.label === inputCommandLabel
    );

    if (matchedCommand) {
      // Check argument length

      const argLength: undefined | number | ArgumentLength =
        matchedCommand.options?.argumentLength;

      if (argLength) {
        const min: number = argLength.hasOwnProperty("min")
          ? (argLength as ArgumentLength).min
          : (argLength as number);

        const max: number = argLength.hasOwnProperty("max")
          ? (argLength as ArgumentLength).max
          : (argLength as number);

        if (parsedInput.length < min) {
          message.reply({
            content: "Not enough arguments.",
          });
        } else if (parsedInput.length > max) {
          message.reply({
            content: "Too many arguments.",
          });
        }
      }

      matchedCommand.execute(parsedInput, message);
    }

    return matchedCommand !== undefined;
  }
}

export { CommandModule };
