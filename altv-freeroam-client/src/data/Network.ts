import * as alt from "alt-client"
import * as native from "natives"

class Network {
    calls: { [id: string]: (result: object) => void } = {}

    constructor() {
        alt.onServer("rpc:callback", (id, result) => {
            this.calls[id](result)
        })
    }

    timedInterval(handler: () => void, miliseconds: number = 10, timeout: number = 3000) {
        let handle = alt.setInterval(handler, miliseconds)
        alt.setTimeout(() => {
            alt.clearInterval(handle)
        }, timeout)
        return handle
    }

    async call(id: string) {
        return await new Promise((resolve) => {
            alt.emitServer("rpc:called", id)
            this.calls[id] = resolve
        })
    }
}

const network = new Network()
export default network
