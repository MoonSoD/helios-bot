import { Message } from "discord.js";

export interface ArgumentLength {
  min: number;
  max: number;
}

export interface CommandOptions {
  label: string;
  description?: string;
  usage?: string;
  argumentLength?: number | ArgumentLength;
}

export abstract class ADiscordCommand {
  public constructor(public options?: CommandOptions) {}

  public abstract execute(args: string[], message: Message): boolean;
}
