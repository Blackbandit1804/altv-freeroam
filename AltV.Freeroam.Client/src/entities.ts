import * as alt from "alt-client"
import { EntityType } from "./enums/entityType"
import { TextLabel } from "./entities/textLabel"
import { Color } from "./common/color"
import { Marker } from "./entities/marker"

const textLabelCollection: TextLabel[] = []
const markerCollection: Marker[] = []
const drawEntitiesHandle = alt.everyTick(() => {
    textLabelCollection.forEach((value) => { value.drawThisFrame() })
    markerCollection.forEach((value) => { value.drawThisFrame() })
})

alt.onServer("entitySync:create", (entityId: number, entityType: EntityType, position: alt.Vector3, data) => {
    switch (entityType) {
        case EntityType.TextLabel:
            if (!textLabelCollection[entityId])
                textLabelCollection[entityId] = new TextLabel(data.text, position, data.scale, data.font, Color.fromArgb(data.color.r, data.color.g, data.color.b, data.color.a))
            else
                textLabelCollection[entityId].active = true
            break;
        case EntityType.Marker:
            if (!markerCollection[entityId])
                markerCollection[entityId] = new Marker(data.markerType, position, data.markerSize, Color.fromArgb(data.color.r, data.color.g, data.color.b, data.color.a), data.bobUpAndDown, data.faceCamera, data.rotate)
            else
                markerCollection[entityId].active = true
            break;
    }
})
alt.onServer("entitySync:remove", (entityId: number, entityType) => {
    switch (entityType) {
        case EntityType.TextLabel:
            textLabelCollection[entityId].active = false
            break;
        case EntityType.Marker:
            markerCollection[entityId].active = false
            break;
    }

})
alt.onServer("entitySync:updatePosition", (entityId, entityType, position) => {

})
alt.onServer("entitySync:updateData", (entityId, entityType, data) => {

})
alt.onServer("entitySync:clearCache", (entityId, entityType) => {
    switch (entityType) {
        case EntityType.TextLabel:
            delete textLabelCollection[entityId]
            break;
        case EntityType.Marker:
            delete markerCollection[entityId]
            break;
    }
})