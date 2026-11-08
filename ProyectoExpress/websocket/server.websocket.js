const {
    WebSocketServer
} = require("ws");

const cartsService =
    require(
        "../services/carts.service"
    );

const websocketService =
    require(
        "../services/websocket.service"
    );

function createWebSocketServer(
    server,
    sessionMiddleware
) {

    const wss =
        new WebSocketServer({
            noServer: true
        });


    server.on(
        "upgrade",
        (
            request,
            socket,
            head
        ) => {

            sessionMiddleware(
                request,
                {},
                () => {

                    if (
                        !request.session ||
                        !request.session.userId
                    ) {

                        socket.write(
                            "HTTP/1.1 401 Unauthorized\r\n\r\n"
                        );

                        socket.destroy();

                        return;
                    }


                    wss.handleUpgrade(
                        request,
                        socket,
                        head,
                        (ws) => {

                            wss.emit(
                                "connection",
                                ws,
                                request
                            );
                        }
                    );
                }
            );
        }
    );

    wss.on(
        "connection",
        (
            ws,
            request
        ) => {
            const userId =
                request.session.userId;

            websocketService.registerConnection(
                ws, userId
            );

            console.log(
                "Cliente conectado al WebSocket"
            );

            console.log(
                "Usuario:",
                request.session.userId
            );

            ws.on(
                "message",
                (message) => {

                    const data =
                        JSON.parse(
                            message.toString()
                        );

                    // ======================================================
                    // CAMBIAR CANTIDAD DEL CARRITO
                    // ======================================================

                    if (
                        data.type ===
                        "CART_QUANTITY_CHANGE"
                    ) {

                        const productId =
                            Number(
                                data.payload.productId
                            );

                        const quantity =
                            Number(
                                data.payload.quantity
                            );

                        const cart =
                            request.session.cart;

                        if (!cart) {
                            websocketService.sendToConnection(
                                ws,
                                "CART_ERROR",
                                {
                                    error:
                                        "No hay carrito asociado a la sesión."
                                }
                            );

                            return;
                        }

                        const result =
                            cartsService
                                .updateQuantity(
                                    cart,
                                    productId,
                                    quantity
                                );

                        if (!result.success) {

                            websocketService.sendToConnection(
                                ws,
                                "CART_ERROR",
                                {
                                        error:
                                            result.error
                                    }
                                );
                            return;
                        }

                        const cartCount =
                            cartsService
                                .getCartCount(
                                    cart
                                );

                        request.session.save(
                            (error) => {

                                if (error) {

                                    console.error(
                                        "Error guardando sesión:",
                                        error
                                    );

                                    return;
                                }

                                websocketService.sendToUser(
                                    userId,
                                    "CART_UPDATED",
                                    {
                                        cartCount:
                                            cartCount
                                    }
                                )
                            }
                        );
                    }

                    if (
                    data.type ===
                        "ADD_PRODUCT_TO_CART"
                    ) {

                        const productId =
                            Number(
                                data.payload.productId
                            );

                        const quantity =
                            Number(
                                data.payload.quantity
                            );

                        // Si todavía no existe carrito,
                        // lo creamos para el usuario de esta sesión.
                        if (!request.session.cart) {

                            request.session.cart =
                                cartsService.createCart(
                                    request.session.userId
                                );
                        }

                        const result =
                            cartsService.addProduct(
                                request.session.cart,
                                productId,
                                quantity
                            );

                        if (!result.success) {

                            websocketService.sendToConnection(
                                ws,
                                "CART_ERROR",
                                {
                                        error:
                                            result.error
                                });
                            return;
                        }


                        const cartCount =
                            cartsService.getCartCount(
                                request.session.cart
                            );

                        request.session.save(
                            (error) => {

                                if (error) {

                                    console.error(
                                        "Error guardando sesión:",
                                        error
                                    );

                                    return;
                                }

                                websocketService.sendToUser(
                                    userId,
                                    "CART_UPDATED",
                                    {
                                        cartCount:
                                            cartCount
                                    }
                                );
                            }
                        );
                    }
                }
            );

            // ======================================================
            // CONEXIÓN CERRADA
            // ======================================================

            ws.on(
            "close",
            () => {
                websocketService.removeConnection(
                    ws
                );
                
                console.log(
                    "Cliente desconectado del WebSocket"
                );
            }
        );
        }
    )
    return wss;
}


module.exports = {
    createWebSocketServer
};
