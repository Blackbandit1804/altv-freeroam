import * as alt from "alt-client"

class Utils {
    timedInterval(handler: () => void, miliseconds = 10, timeout = 3000) {
        let handle = alt.setInterval(handler, miliseconds)
        alt.setTimeout(() => {
            alt.clearInterval(handle)
        }, timeout)
        return handle
    }
}

const utils = new Utils()
export default utils
