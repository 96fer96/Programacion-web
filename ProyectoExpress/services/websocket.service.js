const {
    WebSocket
} = require("ws");


// ======================================================
// CONEXIONES ACTIVAS
// ======================================================

const connections =
    new Set();

// ======================================================
// REGISTRAR CONEXIÓN
// ======================================================

function registerConnection(
    ws,
    userId,
    sessionId
) {

    ws.userId =
        userId;

    ws.sessionId =
        sessionId;

    connections.add(
        ws
    );
}

// ======================================================
// ELIMINAR CONEXIÓN
// ======================================================

function removeConnection(
    ws
) {

    connections.delete(
        ws
    );
}


// ======================================================
// SERIALIZAR MENSAJE
// ======================================================

function serializeMessage(
    type,
    payload
) {

    return JSON.stringify({
        type:
            type,

        payload:
            payload
    });
}


// ======================================================
// ENVIAR A UNA CONEXIÓN
// ======================================================

function sendToConnection(
    ws,
    type,
    payload
) {

    if (
        ws.readyState ===
        WebSocket.OPEN
    ) {

        ws.send(
            serializeMessage(
                type,
                payload
            )
        );
    }
}

// ======================================================
// EMITIR A UN USUARIO
// ======================================================

function sendToUser(
    userId,
    type,
    payload
) {

    connections.forEach(
        (client) => {

            if (
                client.userId ===
                userId
            ) {

                sendToConnection(
                    client,
                    type,
                    payload
                );
            }
        }
    );
}

// ======================================================
// BROADCAST GENERAL
// ======================================================

function broadcast(
    type,
    payload
) {

    connections.forEach(
        (client) => {

            sendToConnection(
                client,
                type,
                payload
            );
        }
    );
}

// ======================================================
// CERRAR CONEXIONES DE UNA SESIÓN
// ======================================================

function closeSessionConnections(sessionId) {

    connections.forEach((client) => {

        if (client.sessionId === sessionId) {

            client.close(
                1008,
                "Sesion finalizada"
            );
        }

    });
}

module.exports = {
    registerConnection,
    removeConnection,
    sendToConnection,
    sendToUser,
    broadcast,
    closeSessionConnections
};