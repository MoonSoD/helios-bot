import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { getModules } from "../../index";
import { CommandModule } from "../command-registry";
import { ADiscordCommand } from "../commands.interface";

class HelpCommand extends ADiscordCommand {
  constructor() {
    super({
      label: "help",
      usage: "help",
      description: "Show help for the commands.",
      argumentLength: 0,
    });
  }

  execute(args: string[], message: Message): boolean {
    const commandModule: CommandModule = getModules().find(
      (module) => module.name === "commands"
    ) as CommandModule;

    if (!commandModule) {
      return true;
    }

    const commandHelp: EmbedFieldData[] = commandModule
      .getCommands()
      .map(({ options }) => {
        return {
          name: options?.usage
            ? commandModule.prefix + options?.usage
            : options?.label,
          value: options?.description ?? "No desription provided.",
          inline: true,
        };
      });

    const helpEmbed: MessageEmbed = new MessageEmbed()
      .setColor("#d02f2f")
      .setTitle("Help")
      .addFields(commandHelp);

    message.reply(helpEmbed);

    return true;
  }
}

export default new HelpCommand();
