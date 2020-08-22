import * as alt from "alt-client"
import * as native from "natives"
import { Text2D } from "./data/Text2D"
import { HudComponent } from "./data/HudComponent";
import { Font } from "./data/Font";
import network from "./data/Network";
import { Color } from "./data/Color";

let statusBar = new Text2D("", 0.002, 0.981, 0.3, Font.Monospace, Color.fromArgb(255, 255, 255, 180))

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
