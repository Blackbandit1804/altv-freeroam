import * as alt from "alt-client"
import * as native from "natives"
import { HudComponent } from "./enums/hudComponent"

const hideHudComponentsHandle = alt.everyTick(() => {
    native.hideHudComponentThisFrame(HudComponent.VehicleName)
    native.hideHudComponentThisFrame(HudComponent.VehicleClass)
    native.hideHudComponentThisFrame(HudComponent.AreaName)
    native.hideHudComponentThisFrame(HudComponent.StreetName)
    native.hideHudComponentThisFrame(HudComponent.WeaponWheelStats)
})