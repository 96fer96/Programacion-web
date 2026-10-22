const {
    WebSocketServer,
    WebSocket
} = require("ws");

const cartsService =
    require(
        "../services/carts.service"
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

            // Asociamos esta conexión WebSocket
            // con el usuario autenticado.
            ws.userId =
                userId;

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

                            ws.send(
                                JSON.stringify({
                                    type:
                                        "CART_ERROR",
                                    payload: {
                                        error:
                                        "CART_NOT_FOUND"
                                    }
                                    
                                })
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

                            ws.send(
                                JSON.stringify({
                                    type:
                                        "CART_ERROR",

                                    payload: {
                                        error:
                                            result.error
                                    }
                                })
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


                                sendToUser(
                                    wss,
                                    userId,
                                    {
                                        type:
                                            "CART_UPDATED",
                                        payload: {
                                            cartCount:
                                                cartCount
                                        }
                                    }
                                );
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

                            ws.send(
                                JSON.stringify({
                                    type:
                                        "CART_ERROR",

                                    payload: {
                                        error:
                                            result.error
                                    }
                                })
                            );

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

                                sendToUser(
                                    wss,
                                    userId,
                                    {
                                        type:
                                            "CART_UPDATED",

                                        payload: {
                                            cartCount:
                                                cartCount
                                        }
                                    }
                                );
                            }
                        );
                    }
                }
            );


            ws.on(
            "close",
            () => {

                console.log(
                    "Cliente desconectado del WebSocket"
                );
            }
        );
        }
    )
    return wss;
}

function sendToUser(
    wss,
    userId,
    message
) {

    wss.clients.forEach(
        (client) => {

            if (
                client.readyState === WebSocket.OPEN
                &&
                client.userId === userId
            ) {

                client.send(
                    JSON.stringify(
                        message
                    )
                );
            }
        }
    );
}

module.exports = {
    createWebSocketServer,
    sendToUser
};