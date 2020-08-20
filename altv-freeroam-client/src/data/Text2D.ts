import * as native from "natives"
import { Font } from "./Font"
import { Color } from "./Color"

export class Text2D {
    text: string
    x: number
    y: number
    scale: number
    color: Color
    font: Font
    isOutlined: boolean

    constructor(text: string, x: number, y: number, scale: number, color: Color = Color.fromRgb(255, 255, 255), font: Font = Font.ChaletComprimeCologne, isOutlined: boolean = true) {
        this.text = text
        this.x = x
        this.y = y
        this.scale = scale
        this.color = color
        this.font = font
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
