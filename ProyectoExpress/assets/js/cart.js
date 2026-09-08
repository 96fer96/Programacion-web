
//este archivo se encarga de manejar la logica del carrito de compras, especificamente el incremento y decremento de la 
//cantidad de productos en el carrito, y es llamado cuando cart.ejs lo requiere: "<script src="/js/cart.js"></script>"

document.addEventListener("DOMContentLoaded", () => {
    const quantityForms = document.querySelectorAll(".cart-quantity-form");

    quantityForms.forEach(form => {
        const minusBtn = form.querySelector(".qty-minus");
        const plusBtn = form.querySelector(".qty-plus");
        const input = form.querySelector(".qty-input");

        minusBtn.addEventListener("click", () => {
            let value = Number(input.value);
            const min = Number(input.min);

            if (value > min) {
                input.value = value - 1;
                form.submit();
            }
        });

        plusBtn.addEventListener("click", () => {
            let value = Number(input.value);
            const max = Number(input.max);

            if (value < max) {
                input.value = value + 1;
                form.submit();
            }
        });
    });
});