document.addEventListener(
    "DOMContentLoaded",
    () => {

        const quantityForms =
            document.querySelectorAll(
                ".cart-quantity-form"
            );

        quantityForms.forEach(
            form => {

                const minusBtn =
                    form.querySelector(
                        ".qty-minus"
                    );

                const plusBtn =
                    form.querySelector(
                        ".qty-plus"
                    );

                const input =
                    form.querySelector(
                        ".qty-input"
                    );


                minusBtn.addEventListener(
                    "click",
                    () => {

                        let value =
                            Number(
                                input.value
                            );

                        const min =
                            Number(
                                input.min
                            );

                        if (value > min) {

                            const newQuantity =
                                value - 1;

                            input.value =
                                newQuantity;

                            sendQuantityChange(
                                form,
                                newQuantity
                            );
                        }
                    }
                );


                plusBtn.addEventListener(
                    "click",
                    () => {

                        let value =
                            Number(
                                input.value
                            );

                        const max =
                            Number(
                                input.max
                            );

                        if (value < max) {

                            const newQuantity =
                                value + 1;

                            input.value =
                                newQuantity;

                            sendQuantityChange(
                                form,
                                newQuantity
                            );
                        }
                    }
                );
            }
        );
    }
);


// ======================================================
// ENVIAR CAMBIO DE CANTIDAD POR WEBSOCKET
// ======================================================

function sendQuantityChange(
    form,
    quantity
) {

    const productId =
        Number(
            form.dataset.productId
        );


    if (
        window.appSocket &&
        window.appSocket.readyState ===
            WebSocket.OPEN
    ) {

        window.appSocket.send(
            JSON.stringify({
                type:
                    "CART_QUANTITY_CHANGE",

                payload: {
                    productId:
                        productId,

                    quantity:
                        quantity
                }
            })
        );

    } else {

        console.log(
            "WebSocket no disponible"
        );
    }
}