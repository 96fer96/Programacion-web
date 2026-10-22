document.addEventListener(
    "DOMContentLoaded",
    () => {

        const forms =
            document.querySelectorAll(
                ".add-to-cart-form"
            );


        forms.forEach(
            (form) => {

                form.addEventListener(
                    "submit",
                    (event) => {

                        // Si WebSocket todavía no está disponible,
                        // permitimos que el formulario funcione
                        // normalmente mediante HTTP.
                        if (
                            !window.appSocket ||
                            window.appSocket.readyState !==
                                WebSocket.OPEN
                        ) {

                            return;
                        }


                        // WebSocket está disponible:
                        // evitamos el POST tradicional.
                        event.preventDefault();


                        const productId =
                            Number(
                                form.dataset.productId
                            );


                        const quantityInput =
                            form.querySelector(
                                '[name="quantity"]'
                            );


                        const quantity =
                            quantityInput
                                ? Number(
                                    quantityInput.value
                                )
                                : 1;


                        window.appSocket.send(
                            JSON.stringify({
                                type:
                                    "ADD_PRODUCT_TO_CART",

                                payload: {
                                    productId:
                                        productId,

                                    quantity:
                                        quantity
                                }
                            })
                        );

                    }
                );

            }
        );
    }
);