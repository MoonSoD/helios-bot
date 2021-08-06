import {client} from "../index";
import {Message} from "discord.js";

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

class PingCommand extends ADiscordCommand {
    public options = {
        label: "ping"
    }

    execute(args: string[], {author, channel}: Message): void {

    }

}

export abstract class AModule {
    public abstract register(): void;
}

export class CommandRegistry extends AModule {

    private commands: ADiscordCommand[] = [new PingCommand()];
    private prefix = process.env.COMMAND_PREFIX ?? "+";

    public register() {
        client.on('message', message => {
            if (message.content.startsWith(this.prefix)) {
                this.handle(message);
            }
        })
    }

    private async handle(message: Message) {
        const parsedInput = message.content
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