const listOfItensFromOrderEl = document.getElementById("itens-of-cart");
const totalValueOrderEl = document.getElementById("total-value-order");
const btnConfirmOrderEl = document.getElementById("btn-confirm-order")
const bntCancelOrderEl = document.getElementById("btn-cancel-order");

btnConfirmOrderEl.addEventListener("click", async () => {
    const items = getItemsFromOrderScreen();

    const payment = document.getElementById('select-payment').value;
    const totalValue = document.getElementById('total-value-order').innerText;
    // show modal, com a mensagem pedido feito agora é so esperar chegar

    const orderObject = {
        payment: payment,
        totalValue: Number(totalValue),
        items: items,
    }

    const result = await makeAOrder(orderObject);

    if (result) {
        showModal({
            title: "Lanche: Nome do Lanche",
            message: "Agora é só esperar o seu lanche chegar",
            icon: "🛵",
            fn: () => {
                btnPedidosEl.click();
                loadOrders();
            }
        });
        listOfItensFromOrderEl.innerText = "";
        clearCart();
    }
})

bntCancelOrderEl.addEventListener('click', () => {
    clearCart();
    btnCardapioEl.click();
})

function getItemsFromOrderScreen() {
    const itemsInfoEl = Array.from(document.getElementsByClassName("info-item-snack"));
    const itemsInfo = itemsInfoEl.map(item => {
        return {
            snack: Number(item.dataset.id),
            quantity: Number(item.dataset.quantity),
            totalValue: Number(item.dataset.total)
        }
    })

    return itemsInfo;
}

function loadItemsOfCart() {
    const snacks = getCartItems();

    const totalValue = snacks.reduce((prev, current) => {
        return prev + current.value
    }, 0)

    totalValueOrderEl.innerText = totalValue.toFixed(2);

    console.log(`total value ${totalValue}`);

    if (snacks.length == 0) {
        showModal({
            title: 'Seu Carrinho',
            message: '',
            icon: 'Voce nao tem nemhum item no seu carrinho',
            fn: () => { }
        })
    }

    listOfItensFromOrderEl.innerText = "";

    snacks.forEach(snack => {
        const rowSnackItem = createRowItemOfOrder(snack);
        listOfItensFromOrderEl.insertAdjacentHTML("beforeend", rowSnackItem);
    })

}

function updateValue(quantity, price, idFieldTotalValue, infoOrderItemId) {
    const totalValue = (quantity * price).toFixed(2);

    const item = document.getElementById(idFieldTotalValue);
    item.dataset.value = totalValue;
    item.textContent = `R$ ${totalValue}`;
    updateInfoItem(quantity, totalValue, infoOrderItemId)
    updateTotalValueOrder();
}

function updateInfoItem(quantity, price, id) {
    let itemOrderInfo = document.getElementById(id);
    itemOrderInfo.dataset.quantity = quantity;
    itemOrderInfo.dataset.total = price

}

function updateTotalValueOrder() {
    const itemsTotalValue = Array.from(document.getElementsByClassName("total-value-item"));

    const totalValueOrder = itemsTotalValue.reduce((prev, current) => {
        return prev + Number(current.dataset.value);
    }, 0)

    totalValueOrderEl.innerText = totalValueOrder.toFixed(2);
}

function createRowItemOfOrder(snack) {
    const { id, name, image, value } = snack;
    return `
        <tr
            class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            
            <div class="hidden info-item-snack" id="info-order-item-${id}" data-id=${id} data-quantity=1 data-total=${value}> <div/>
            
            <th>
                <img src="${image}" style="width: 100px;" />
            </th>

            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                ${name}
            </th>
            <td class="px-6 py-4">
                R$ ${value}
            </td>
            <td class="px-6 py-4">
                <input type="number" value="1" min="0" , max="10" 
                            onchange="updateValue(this.value, ${value}, 'total-value-id-${id}', 'info-order-item-${id}')">
            </td>
            <td class="px-6 py-4 total-value-item" id="total-value-id-${id}", data-value=${value}>
                R$ ${value}
            </td>

            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <button onclick='removeCartItem(${id})'>Remover</button> 
            </th>
            
        </tr>`
}

function removeCartItem(id) {

    removeSnackFromCart(id);
    loadItemsOfCart();
}

(() => {
    loadItemsOfCart();
})()