import * as alt from "alt-client"
import * as native from "natives"
import { Text2D } from "./data/Text2D"
import { HudComponent } from "./data/HudComponent";
import { Font } from "./data/Font";
import network from "./data/Network";

let ping = new Text2D("", 0.025, 0.78, 0.33)
let playerId = new Text2D(`ID ~y~#${alt.Player.local.id}`, 0.005, 0.78, 0.33)

let drawStatusTextHandle = alt.everyTick(() => {
    ping.drawThisFrame()
    playerId.drawThisFrame()
})

let hideHudComponentsHandle = alt.everyTick(() => {
    native.hideHudComponentThisFrame(HudComponent.VehicleName)
    native.hideHudComponentThisFrame(HudComponent.VehicleClass)
    native.hideHudComponentThisFrame(HudComponent.AreaName)
    native.hideHudComponentThisFrame(HudComponent.StreetName)
    native.hideHudComponentThisFrame(HudComponent.RadioStations)
    native.hideHudComponentThisFrame(HudComponent.WeaponWheelStats)
})

let updatePingHandle = alt.setInterval(async () => {
    ping.text = `${await network.call("getPing")} ~y~ms`
}, 1000)
