import * as alt from "alt-client"
import * as native from "natives"

alt.onServer("sendConsoleMessage", (message: string) => alt.log(`[SERVER] ${message}`))
alt.onServer("enterVehicle", (vehicle: alt.Vehicle) => {
    let interval = alt.setInterval(() => {
        if (vehicle.scriptID) {
            native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
            alt.clearInterval(interval);
        }
    }, 10);
})

alt.on("consoleCommand", (name: string, ...args: string[]) => alt.emitServer("commandEntered", name, args))
