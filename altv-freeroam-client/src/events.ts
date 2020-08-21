import * as alt from "alt-client"
import * as native from "natives"
import { VehicleSeat } from "./data/VehicleSeat";

const lowestZCoord = -199.9

alt.onServer("sendConsoleMessage", (message: string) => {
    return alt.log(`[SERVER] ${message.replace(/[\n\r]/g, "")}`);
})
alt.onServer("enterVehicle", (vehicle: alt.Vehicle) => {
    let interval = alt.setInterval(() => {
        if (vehicle.scriptID) {
            native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, VehicleSeat.Driver);
            alt.clearInterval(interval);
        }
    }, 10);
})
alt.onServer("teleportToMarker", () => {
    let handle = native.getFirstBlipInfoId(8)
    if (native.doesBlipExist(handle)) {
        let coords = native.getBlipInfoIdCoord(handle)
        native.setPedCoordsKeepVehicle(alt.Player.local.scriptID, coords.x, coords.y, lowestZCoord);
    }
})
alt.on("consoleCommand", (name: string, ...args: string[]) => alt.emitServer("commandEntered", name, args))
