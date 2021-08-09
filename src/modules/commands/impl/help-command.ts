import { Message } from "discord.js";
import { getModules } from "../../index";
import { CommandModule } from "../command-registry";
import { ADiscordCommand } from "../commands.interface";

class HelpCommand extends ADiscordCommand {
  constructor() {
    super({ label: "help", argumentLength: 0, usage: "/help" });
  }

  execute(args: string[], message: Message): boolean {
    const commandModule: CommandModule = getModules().find(
      (module) => module.name === "commands"
    ) as CommandModule;

    if (!commandModule) {
      return true;
    }

    let list: string = "\n__Commands:__";

    commandModule.getCommands().forEach((command) => {
      list = list.concat(
        `\n${process.env.COMMAND_PREFIX}${
          command.options?.usage ?? command.options?.label
        } ${
          command.options?.description
            ? "- " + command.options?.description
            : ""
        }`
      );
    });

    message.reply(list);

    return true;
  }
}

export default new HelpCommand();
