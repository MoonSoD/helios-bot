import {Message} from "discord.js";
import {ADiscordCommand} from "../command-registry";

class PingCommand extends ADiscordCommand {
    constructor() {
        super({label: "ping"});
    }

    execute(args: string[], {reply}: Message): void {
        reply("Pong!")
    }
}

export default new PingCommand()