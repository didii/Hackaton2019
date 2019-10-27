export class Helper {
    public static rand(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }
    public static randInt(min: number, max: number): number {
        return Math.floor(Helper.rand(min, max));
    }
}