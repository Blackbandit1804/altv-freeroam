import * as alt from "alt-client"
import * as native from "natives"
import { PedModel } from "./PedModel"
import { Component } from "./Component";

export class Skin {
    static getModel() {
        return native.getEntityModel(alt.Player.local.scriptID)
    }

    static isModelValid() {
        if (this.getModel() == PedModel.FreemodeFemale01 || PedModel.FreemodeMale01)
            return true;
        return false;
    }

    static isMale() {
        if (this.getModel() == PedModel.FreemodeMale01)
            return true
        else if (this.getModel() == PedModel.FreemodeFemale01)
            return false
        throw new Error()
    }

    static setVariation(component: Component, drawableId: number, textureId: number = 0, paletteId: number = 0) {
        native.setPedComponentVariation(alt.Player.local.scriptID, component, drawableId, textureId, paletteId)
    }

    static setDefault() {
        native.setPedDefaultComponentVariation(alt.Player.local.scriptID)
        native.clearAllPedProps(alt.Player.local.scriptID)
        if (this.isMale()) {
            this.setVariation(Component.Top, 15)        // Topless
            this.setVariation(Component.Undershirt, 15) // No Undershirt
            this.setVariation(Component.Torso, 15)      // Full Torso
            this.setVariation(Component.Legs, 21)       // Heart Boxers
            this.setVariation(Component.Shoes, 34)      // Shoeless
        }
        else {

        }
    }
}
