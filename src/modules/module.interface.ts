export abstract class AModule {
  constructor(public name: string) {}

  public abstract register(): void;
}
