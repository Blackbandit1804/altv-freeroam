import * as native from "natives"
import { Font } from "../enums/font"
import { Color } from "../common/color"
import { Vector3 } from "alt-client"

export class TextLabel {
    text: string
    position: Vector3
    scale: number
    font: Font
    color: Color
    active: boolean

    constructor(text: string, position: Vector3, scale: number, font: Font, color: Color, active = true) {
        this.text = text
        this.position = position
        this.scale = scale
        this.font = font
        this.color = color
        this.active = active
    }

    drawThisFrame() {
        if (this.active) {
            let p = native.getGameplayCamCoord()
            let dist = native.getDistanceBetweenCoords(p.x, p.y, p.z, this.position.x, this.position.y, this.position.z, true)
            let scale = (1 / dist) * 20
            let fov = (1 / native.getGameplayCamFov()) * 100
            scale = scale * fov
            native.setTextScale(0, this.scale * scale)
            native.setTextColour(this.color.red, this.color.green, this.color.blue, this.color.alpha)
            native.setTextFont(this.font)
            native.setTextOutline()
            native.setDrawOrigin(this.position.x, this.position.y, this.position.z, 0)
            native.beginTextCommandDisplayText("STRING")
            native.addTextComponentSubstringPlayerName(this.text)
            native.endTextCommandDisplayText(0, 0, 0)
            native.clearDrawOrigin()
        }
    }
}
