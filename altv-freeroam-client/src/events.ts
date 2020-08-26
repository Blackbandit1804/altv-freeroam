import * as alt from "alt-client"
import * as native from "natives"
import network from "./common/network"
import { VehicleSeat } from "./enums/vehicleSeat"
import skin from "./common/skin"
import { TextLabel } from "./entities/textLabel"
import { EntityType } from "./enums/entityType"
import { Color } from "./common/color"

const lowestZCoord = -199.9
const textLabelCollection: TextLabel[] = []

alt.onServer("sendConsoleMessage", (message: string) => alt.log(`[SERVER] ${message.replace(/[\n\r]/g, "")}`))

alt.on("consoleCommand", (name: string, ...args: string[]) => alt.emitServer("commandEntered", name, args))

alt.onServer("enterVehicle", (vehicle: alt.Vehicle) => {
    let handle = network.timedInterval(() => {
        if (vehicle.scriptID) {
            native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, VehicleSeat.Driver);
            alt.clearInterval(handle);
        }
    })
})

alt.onServer("teleportToMarker", () => {
    let handle = native.getFirstBlipInfoId(8)
    if (native.doesBlipExist(handle)) {
        let coords = native.getBlipInfoIdCoord(handle)
        native.setPedCoordsKeepVehicle(alt.Player.local.scriptID, coords.x, coords.y, lowestZCoord);
    }
})

alt.onServer("clientConnected", () => {
    let handle = network.timedInterval(() => {
        if (native.getEntityModel(alt.Player.local.scriptID)) {
            skin.setDefault()
            alt.emitServer("clientSpawned")
            alt.clearInterval(handle)
        }
    })
})

alt.onServer("fixVehicle", (vehicle: alt.Vehicle) => {
    native.setVehicleFixed(vehicle.scriptID)
    native.setVehicleDeformationFixed(vehicle.scriptID)
})

alt.onServer("entitySync:create", (entityId: number, entityType: EntityType, position: alt.Vector3, data) => {
    switch (entityType) {
        case EntityType.TextLabel:
            if (!textLabelCollection[entityId]) {
                let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, 0, 0)
                textLabelCollection[entityId] = (new TextLabel(data.text, result[1], result[2], data.scale, data.font, Color.fromArgb(data.color.r, data.color.g, data.color.b, data.color.a)))
            }
            else
                textLabelCollection[entityId].active = true
            break;
    }
})

alt.onServer("entitySync:remove", (entityId: number, entityType) => {
    switch (entityType) {
        case EntityType.TextLabel:
            textLabelCollection[entityId].active = false
            break;
    }

})

alt.onServer("entitySync:updatePosition", (entityId, entityType, position) => {
    switch (entityType) {
        case EntityType.TextLabel:
            let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, 0, 0)
            textLabelCollection[entityId].x = result[1]
            textLabelCollection[entityId].y = result[2]
            break;
    }
})

alt.onServer("entitySync:updateData", (entityId, entityType, data) => {

})

alt.onServer("entitySync:clearCache", (entityId, entityType) => {
    switch (entityType) {
        case EntityType.TextLabel:
            delete textLabelCollection[entityId]
            break;
    }
})

let drawTextLabelsHandle = alt.everyTick(() => {
    textLabelCollection.forEach((value) => { value.drawThisFrame() })
})
