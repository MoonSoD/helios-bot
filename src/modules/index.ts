import { CommandModule } from "./commands/command-registry";
import { AModule } from "./module.interface";

const modules: AModule[] = [new CommandModule()];

export const registerModules = () => {
  modules.forEach((module) => module.register());
};
