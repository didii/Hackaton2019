export abstract class Module {
    public enabled: boolean = true;
    public init(): void {}
    public update(timeDelta: number): void {}
    public destroy(): void {}
}