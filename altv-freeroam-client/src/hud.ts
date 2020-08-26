import * as alt from "alt-client"
import * as native from "natives"
import { TextLabel } from "./entities/textLabel"
import { Font } from "./enums/font"
import { Color } from "./common/color"
import { HudComponent } from "./enums/hudComponent"
import network from "./common/network"

let statusBar = new TextLabel("", 0.002, 0.981, 0.3, Font.Monospace, Color.fromArgb(255, 255, 255, 180))

let drawStatusTextHandle = alt.everyTick(() => {
    statusBar.drawThisFrame()
})

let hideHudComponentsHandle = alt.everyTick(() => {
    native.hideHudComponentThisFrame(HudComponent.VehicleName)
    native.hideHudComponentThisFrame(HudComponent.VehicleClass)
    native.hideHudComponentThisFrame(HudComponent.AreaName)
    native.hideHudComponentThisFrame(HudComponent.StreetName)
    native.hideHudComponentThisFrame(HudComponent.WeaponWheelStats)
})

let updateStatusBarHandle = alt.setInterval(async () => {
    let scriptId = alt.Player.local.scriptID
    let pos = alt.Player.local.pos
    statusBar.text = "id ~y~" + alt.Player.local.id + "  ~g~" +
        await network.call("getPing") + "~s~ ms  ~g~" +
        native.getEntityHealth(alt.Player.local.scriptID) + "~s~ health  ~b~" +
        native.getPedArmour(alt.Player.local.scriptID) + "~s~ armour  ~y~" +
        alt.Player.all.length + "~s~ online  ~y~" +
        native.getLabelText(native.getNameOfZone(pos.x, pos.y, pos.z,))
}, 1000)
