import { client } from "../../index";
import { Message } from "discord.js";

import PingCommand from "./impl/ping-command";
import { ADiscordCommand, ArgumentLength } from "./commands.interface";
import { AModule } from "../module.interface";
import HelpCommand from "./impl/help-command";

class CommandModule extends AModule {
  private commands: ADiscordCommand[] = [PingCommand, HelpCommand];
  public prefix: string = process.env.COMMAND_PREFIX ?? ".";

  constructor() {
    super("commands");
  }

  public getCommands(): ADiscordCommand[] {
    return this.commands;
  }

  public register() {
    client.on("message", (message) => {
      if (message.content.startsWith(this.prefix)) {
        this.handleCommand(message);
      }
    });
  }

  private async handleCommand(message: Message): Promise<void> {
    const parsedInput = message.content
      .substring(1) // Cut the prefix
      .toLowerCase()
      .trim()
      .split(" ");

    const inputCommandLabel: string | undefined = parsedInput.shift();

    if (!inputCommandLabel) {
      message.reply("Unknown command. For a list of commands see /help.");
      return;
    }

    const matchedCommand: ADiscordCommand | undefined = this.commands.find(
      (command) => command?.options?.label === inputCommandLabel
    );

    if (!matchedCommand) {
      message.reply("Unknown command. For a list of commands see /help.");
      return;
    }

    // Check argument length

    const argLength: undefined | number | ArgumentLength =
      matchedCommand.options?.argumentLength;

    if (argLength !== undefined) {
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
        return;
      } else if (parsedInput.length > max) {
        message.reply({
          content: "Too many arguments.",
        });
        return;
      }
    }

    if (!matchedCommand.execute(parsedInput, message)) {
      if (matchedCommand.options?.usage) {
        message.reply(`Usage: ${matchedCommand.options?.usage}`);
        return;
      }
    }
  }
}

export { CommandModule };
