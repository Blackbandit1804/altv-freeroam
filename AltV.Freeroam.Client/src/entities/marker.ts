import * as native from "natives"
import { MarkerType } from "../enums/markerType";
import { Vector3 } from "alt-client";
import { Color } from "../common/color";

export class Marker {
    type: MarkerType
    position: Vector3
    markerSize: number
    color: Color
    bobUpAndDown: boolean
    faceCamera: boolean
    rotate: boolean
    active: boolean

    constructor(type: MarkerType, position: Vector3, markerSize: number, color: Color, bobUpAndDown: boolean, faceCamera: boolean, rotate: boolean, active = true) {
        this.type = type
        this.position = position
        this.markerSize = markerSize
        this.color = color
        this.bobUpAndDown = bobUpAndDown
        this.faceCamera = faceCamera
        this.rotate = rotate
        this.active = active
    }

    drawThisFrame() {
        if (this.active) {
            native.drawMarker(
                this.type,
                this.position.x,
                this.position.y,
                this.position.z,
                0, 0, 0, 0, 0, 0,
                this.markerSize,
                this.markerSize,
                this.markerSize,
                this.color.red,
                this.color.green,
                this.color.blue,
                this.color.alpha,
                this.bobUpAndDown,
                this.faceCamera,
                2,
                this.rotate,
                undefined,
                undefined,
                false)
        }
    }
}
