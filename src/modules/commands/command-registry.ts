import {client} from "../../index";
import {Message} from "discord.js";
import {AModule} from "../index";

import PingCommand from "./impl/ping-command"

class CommandModule extends AModule {
    private commands: ADiscordCommand[] = [PingCommand];
    private prefix = process.env.COMMAND_PREFIX ?? "+";

    public register() {
        client.on('message', message => {
            if (message.content.startsWith(this.prefix)) {
                this.handleCommand(message);
            }
        })
    }

    private async handleCommand(message: Message) {
        const parsedInput = message.content
            .toLowerCase()
            .trim()
            .split(" ");

        const inputCommandLabel = parsedInput[0]
        const matchedCommand = this.commands.find(command => command?.options?.label === inputCommandLabel)

        if (matchedCommand) {
            parsedInput.shift();
            matchedCommand.execute(parsedInput, message)
        }

        return matchedCommand !== undefined;
    }

}

interface CommandOptions {
    label: string;
    description?: string;
    usage?: string;
}

abstract class ADiscordCommand {

    public constructor(
        public options?: CommandOptions
    ) {
    }

    public abstract execute(args: string[], message: Message): void;
}

export {
    ADiscordCommand,
    CommandModule
}