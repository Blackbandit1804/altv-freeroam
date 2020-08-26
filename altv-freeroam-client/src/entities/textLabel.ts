import * as native from "natives"
import { Font } from "../enums/font"
import { Color } from "../common/color"

export class TextLabel {
    text: string
    x: number
    y: number
    scale: number
    font: Font
    color: Color
    active: boolean

    constructor(text: string, x: number, y: number, scale: number, font = Font.ChaletComprimeCologne, color = Color.fromRgb(255, 255, 255), active = true) {
        this.text = text
        this.x = x
        this.y = y
        this.scale = scale
        this.font = font
        this.color = color
        this.active = active
    }

    drawThisFrame() {
        if (this.active) {
            native.setTextScale(0, this.scale)
            native.setTextColour(this.color.red, this.color.green, this.color.blue, this.color.alpha)
            native.setTextFont(this.font)
            native.setTextOutline()
            native.beginTextCommandDisplayText("STRING")
            native.addTextComponentSubstringPlayerName(this.text)
            native.endTextCommandDisplayText(this.x, this.y, 0.0)
        }
    }
}
