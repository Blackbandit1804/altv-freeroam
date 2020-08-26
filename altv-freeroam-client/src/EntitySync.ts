import * as alt from "alt-client"
import * as native from "natives"
import { TextLabel } from "./entities/TextLabel"
import { Color } from "./data/Color"
import { EntityType } from "./enums/EntityType"

let textLabelCollection: TextLabel[] = []

alt.onServer("entitySync:create", (entityId: number, entityType: EntityType, position: alt.Vector3, data) => {
    switch (entityType) {
        case EntityType.TextLabel:
            if (!textLabelCollection[entityId]) {
                let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, 0, 0)
                textLabelCollection[entityId] = (new TextLabel(data.text, result[1], result[2], data.scale, data.font, Color.fromArgb(data.color.r, data.color.g, data.color.b, data.color.a)))
            }
            else
                textLabelCollection[entityId].active = true
            break;
    }
})

alt.onServer("entitySync:remove", (entityId: number, entityType) => {
    switch (entityType) {
        case EntityType.TextLabel:
            textLabelCollection[entityId].active = false
            break;
    }

})

alt.onServer("entitySync:updatePosition", (entityId, entityType, position) => {
    switch (entityType) {
        case EntityType.TextLabel:
            let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, 0, 0)
            textLabelCollection[entityId].x = result[1]
            textLabelCollection[entityId].y = result[2]
            break;
    }
})

alt.onServer("entitySync:updateData", (entityId, entityType, data) => {

})

alt.onServer("entitySync:clearCache", (entityId, entityType) => {
    switch (entityType) {
        case EntityType.TextLabel:
            delete textLabelCollection[entityId]
            break;
    }
})

let drawTextLabelsHandle = alt.everyTick(() => {
    textLabelCollection.forEach((value) => { value.drawThisFrame() })
})