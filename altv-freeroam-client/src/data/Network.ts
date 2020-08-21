import * as alt from "alt-client"
import * as native from "natives"

export class Network {
    static TimedInterval(handler: () => void, miliseconds: number = 10, timeout: number = 3000) {
        let handle = alt.setInterval(handler, miliseconds)
        alt.setTimeout(() => {
            alt.clearInterval(handle)
        }, timeout)
        return handle
    }
}
