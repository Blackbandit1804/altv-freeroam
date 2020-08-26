export class Color {
    red: number
    green: number
    blue: number
    alpha: number

    private constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red
        this.green = green
        this.blue = blue
        this.alpha = alpha
    }

    static fromArgb(red: number, green: number, blue: number, alpha: number) {
        return new Color(red, green, blue, alpha);
    }

    static fromRgb(red: number, green: number, blue: number) {
        return new Color(red, green, blue, 255);
    }
}
