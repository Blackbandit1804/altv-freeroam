import * as alt from "alt-client"

alt.onServer("sendConsoleMessage", (message: string) => alt.log(`[SERVER] ${message}`))

alt.on("consoleCommand", (name: string, ...args: string[]) => alt.emitServer("commandEntered", name, args))
