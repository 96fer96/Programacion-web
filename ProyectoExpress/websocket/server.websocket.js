const {
    WebSocketServer
} = require("ws");

function createWebSocketServer(server) {
    const wss = new WebSocketServer({
        server
    })

    wss.on(
        "connection", (ws) => {
            console.log("Cliente conectado al WebSocket");
            ws.on(
                "close", () => {
                    console.log("Cliente desconectado del WebSocket");
                }
            )
        }
        
    )
    return wss;
}