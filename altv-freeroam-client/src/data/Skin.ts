import * as alt from "alt-client"
import * as native from "natives"
import { PedModel } from "../enums/PedModel"
import { Component } from "../enums/Component"

class Skin {
    getModel() {
        return native.getEntityModel(alt.Player.local.scriptID)
    }

    isModelValid() {
        if (this.getModel() == PedModel.FreemodeFemale01 || PedModel.FreemodeMale01)
            return true;
        return false;
    }

    isMale() {
        if (this.getModel() == PedModel.FreemodeMale01)
            return true
        else if (this.getModel() == PedModel.FreemodeFemale01)
            return false
        throw new Error()
    }

    setVariation(component: Component, drawableId: number, textureId = 0, paletteId = 0) {
        native.setPedComponentVariation(alt.Player.local.scriptID, component, drawableId, textureId, paletteId)
    }

    setDefault() {
        native.setPedDefaultComponentVariation(alt.Player.local.scriptID)
        native.clearAllPedProps(alt.Player.local.scriptID)
        native.clearPedBloodDamage(alt.Player.local.scriptID)
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

const skin = new Skin()
export default skin
