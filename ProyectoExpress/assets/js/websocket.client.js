const statusIndicator =
    document.getElementById(
        "ws-status-indicator"
    );


// Por ahora solamente abrimos WebSocket
// cuando existe un usuario conectado,
// ya que el indicador solo se muestra
// para usuarios autenticados.
if (statusIndicator) {

    connectWebSocket();
}


function connectWebSocket() {

    const socket =
        new WebSocket(
            "ws://localhost:3000"
        );


    // Permite que otros archivos JS puedan acceder
    // a la conexión WebSocket activa.
    window.appSocket =
        socket;


    // ======================================================
    // CONEXIÓN ABIERTA
    // ======================================================

    socket.addEventListener(
        "open",
        () => {

            console.log(
                "WebSocket conectado"
            );


            statusIndicator
                .classList
                .remove(
                    "disconnected"
                );

            statusIndicator
                .classList
                .add(
                    "connected"
                );


            statusIndicator.title =
                "WebSocket conectado";
        }
    );


    // ======================================================
    // CONEXIÓN CERRADA
    // ======================================================

    socket.addEventListener(
        "close",
        () => {

            console.log(
                "WebSocket desconectado"
            );


            statusIndicator
                .classList
                .remove(
                    "connected"
                );

            statusIndicator
                .classList
                .add(
                    "disconnected"
                );


            statusIndicator.title =
                "WebSocket desconectado";


            setTimeout(
                () => {

                    console.log(
                        "Intentando reconectar WebSocket..."
                    );

                    connectWebSocket();

                },
                3000
            );
        }
    );


    // ======================================================
    // RECEPCIÓN DE MENSAJES
    // ======================================================

    socket.addEventListener(
        "message",
        (event) => {

            const data =
                JSON.parse(
                    event.data
                );


            if (
                data.type ===
                "CART_UPDATED"
            ) {

                updateCartCount(
                    data.payload.cartCount
                );
            }


            if (
                data.type ===
                "CART_ERROR"
            ) {

                console.error(
                    "Error de carrito:",
                    data.payload.error
                );
            }
        }
    );


    // ======================================================
    // ERROR DE WEBSOCKET
    // ======================================================

    socket.addEventListener(
        "error",
        (error) => {

            console.error(
                "Error WebSocket:",
                error
            );
        }
    );
}


// ======================================================
// ACTUALIZAR CONTADOR DEL CARRITO
// ======================================================

function updateCartCount(
    cartCount
) {

    const cartCounter =
        document.querySelector(
            ".cart-count"
        );


    if (!cartCounter) {
        return;
    }


    cartCounter.textContent =
        cartCount;


    if (cartCount > 0) {

        cartCounter.style.display =
            "flex";

    } else {

        cartCounter.style.display =
            "none";
    }
}