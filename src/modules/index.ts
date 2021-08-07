import {CommandModule} from "./commands/command-registry";

export abstract class AModule {
    public abstract register(): void;
}

const modules: AModule[] = [
    new CommandModule()
]

export const registerModules = () => {
    modules.forEach(module => module.register())
}


