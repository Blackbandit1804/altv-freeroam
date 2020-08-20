import * as alt from "alt-client"
import * as native from "natives"
import { Text2D } from "./data/Text2D"

alt.everyTick(() => {
    new Text2D(`ID ~y~#${alt.Player.local.scriptID}`, 0, 0, 0.35).drawThisFrame()
})
