import * as alt from "alt-client"
import * as native from "natives"
import { Text2D } from "./data/Text2D"
import { HudComponent } from "./data/HudComponent";
import { Font } from "./data/Font";

let statusText = new Text2D(`ID ~y~#${alt.Player.local.id}~s~\tONLINE ~y~${alt.Player.all.length}`, 0, 0, 0.35);

let drawStatusTextHandle = alt.everyTick(() => {
    statusText.drawThisFrame()
})

let hideHudComponentsHandle = alt.everyTick(() => {
    native.hideHudComponentThisFrame(HudComponent.VehicleName)
    native.hideHudComponentThisFrame(HudComponent.VehicleClass)
    native.hideHudComponentThisFrame(HudComponent.AreaName)
    native.hideHudComponentThisFrame(HudComponent.StreetName)
    native.hideHudComponentThisFrame(HudComponent.RadioStations)
    native.hideHudComponentThisFrame(HudComponent.WeaponWheelStats)
})
