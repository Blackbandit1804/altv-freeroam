import * as alt from "alt-client"
import * as native from "natives"
import { VehicleSeat } from "./enums/vehicleSeat"
import skin from "./common/skin"
import utils from "./common/utils"

const lowestZCoord = -199.9

alt.on("consoleCommand", (name: string, ...args: string[]) => alt.emitServer("commandEntered", name, args))
alt.onServer("sendConsoleMessage", (message: string) => alt.log(`[SERVER] ${message.replace(/[\n\r]/g, "")}`))
alt.onServer("enterVehicle", (vehicle: alt.Vehicle) => {
    let handle = utils.timedInterval(() => {
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
    let handle = utils.timedInterval(() => {
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
