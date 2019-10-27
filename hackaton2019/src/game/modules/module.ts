export abstract class Module {
    public enabled: boolean = true;
    public init(data: Object): void {}
    public update(timeDelta: number): void {}
    public destroy(): void {}
}