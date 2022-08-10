const btnConfirmOrderModalEl = document.getElementById("btn-confirm-order");
const btnCancelOrderEl = document.getElementById("btn-cancel-order");

const inputNameSnackEl = document.getElementById("input-name-snack");
const inputValueSnackEl = document.getElementById("input-value-snack");
const imageSnackEl = document.getElementById("image-snack");
const idSnackEl = document.getElementById("id-snack");
const inputQuantityEl = document.getElementById("input-quantity")
const selectPaymentEl = document.getElementById("select-payment")

btnConfirmOrderModalEl.addEventListener("click", (event) => {
    event.preventDefault();

    showModal({
        title: "Lanche: Nome do Lanche",
        message: "Agora é só esperar o seu lanche chegar",
        icon: "🛵",
        fn: () => {
            btnPedidosEl.click();
            loadOrders();
        }
    });

    let orderObject = getOrderFromForm();
    makeAOrder(orderObject);
});

inputQuantityEl.addEventListener("change", () => {
    inputValueSnackEl.value = (getSnackSelected().value * inputQuantityEl.value);
})

btnCancelOrderEl.addEventListener("click", () => {
    btnHomeEl.click();
})

function fillOrderConfirmationPage() {
    let snack = getSnackSelected();

    idSnackEl.innerText = snack.id;
    imageSnackEl.src = snack.image;
    inputNameSnackEl.value = snack.name;
    inputValueSnackEl.value = snack.value;
}

function getOrderFromForm() {
    let orderObject = {};

    orderObject.id_snack = idSnackEl.innerText;
    orderObject.totalValue = (inputValueSnackEl.value * inputQuantityEl.value);
    orderObject.payment = selectPaymentEl.value;

    return orderObject;
}

(async () => {
    fillOrderConfirmationPage();
})();