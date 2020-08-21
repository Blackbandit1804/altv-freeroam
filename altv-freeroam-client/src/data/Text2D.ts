import * as native from "natives"
import { Font } from "./Font"
import { Color } from "./Color"

export class Text2D {
    text: string
    x: number
    y: number
    scale: number
    font: Font
    color: Color
    isOutlined: boolean

    constructor(text: string, x: number, y: number, scale: number, font: Font = Font.ChaletComprimeCologne, color: Color = Color.fromRgb(255, 255, 255), isOutlined: boolean = true) {
        this.text = text
        this.x = x
        this.y = y
        this.scale = scale
        this.font = font
        this.color = color
        this.isOutlined = isOutlined
    }

    drawThisFrame() {
        native.setTextScale(0, this.scale)
        native.setTextColour(this.color.red, this.color.green, this.color.blue, this.color.alpha)
        native.setTextFont(this.font)
        if (this.isOutlined)
            native.setTextOutline()
        native.beginTextCommandDisplayText("STRING")
        native.addTextComponentSubstringPlayerName(this.text)
        native.endTextCommandDisplayText(this.x, this.y, 0.0)
    }
}
