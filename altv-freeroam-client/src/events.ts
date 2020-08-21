import * as alt from "alt-client"
import * as native from "natives"
import { VehicleSeat } from "./data/VehicleSeat";
import { Skin } from "./data/Skin";
import { Network } from "./data/Network";

const lowestZCoord = -199.9

alt.onServer("sendConsoleMessage", (message: string) => {
    return alt.log(`[SERVER] ${message.replace(/[\n\r]/g, "")}`);
})

alt.onServer("enterVehicle", (vehicle: alt.Vehicle) => {
    let handle = Network.TimedInterval(() => {
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
    let handle = Network.TimedInterval(() => {
        if (native.getEntityModel(alt.Player.local.scriptID)) {
            Skin.setDefault()
            alt.clearInterval(handle)
        }
    })
})

alt.on("consoleCommand", (name: string, ...args: string[]) => {
    return alt.emitServer("commandEntered", name, args);
})
