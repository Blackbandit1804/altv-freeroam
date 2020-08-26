import * as alt from "alt-client"

class Network {
    calls: { [id: string]: (result: object) => void } = {}

    constructor() {
        alt.onServer("rpcCallback", (id, result) => {
            this.calls[id](result)
        })
    }

    timedInterval(handler: () => void, miliseconds = 10, timeout = 3000) {
        let handle = alt.setInterval(handler, miliseconds)
        alt.setTimeout(() => {
            alt.clearInterval(handle)
        }, timeout)
        return handle
    }

    async call(id: string) {
        return await new Promise((resolve) => {
            alt.emitServer("rpcCalled", id)
            this.calls[id] = resolve
        })
    }
}

const network = new Network()
export default network
