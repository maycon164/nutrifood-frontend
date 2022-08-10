
const pages = [
    {
        html: "./src/views/home.html",
        script: "./src/controller/home.controller.js",
        loaded: false,
        section: document.getElementById("home-section")
    },
    {
        html: "./src/views/cardapio.html",
        script: "./src/controller/snacks.controller.js",
        loaded: false,
        section: document.getElementById("cardapio-section")
    },
    {
        html: "./src/views/pedidos.html",
        script: "./src/controller/order.controller.js",
        loaded: false,
        section: document.getElementById("pedidos-section")
    },
    {
        html: "./src/views/confirmarPedido.html",
        script: "./src/controller/confirmorder.controller.js",
        loaded: false,
        section: document.getElementById("confirmar-pedido-section")
    },
    {
        html: "./src/views/snackManage.html",
        script: "./src/controller/snackmanage.controller.js",
        loaded: false,
        section: document.getElementById("snack-manage-section")
    },
    {
        html: "./src/views/login.html",
        script: "./src/controller/login.controller.js",
        loaded: false,
        section: document.getElementById("login-section")
    },
    {
        html: "./src/views/cart.html",
        script: "./src/controller/cart.controller.js",
        loaded: false,
        section: document.getElementById("cart-section")
    }
]

const buttonsHeader = Array.from(document.getElementsByClassName("btn"));
const btnHomeEl = document.getElementById("btn-home");
const btnCardapioEl = document.getElementById("btn-cardapio");
const btnPedidosEl = document.getElementById("btn-pedidos");
const btnCartEl = document.getElementById("btn-cart");
const btnSnackManageEl = document.getElementById("btn-snack-manage");
const btnLoginEl = document.getElementById("btn-login");
const btnLogoutEl = document.getElementById("btn-logout");


function verifyIfIsLoggedIn() {

    if (getTokenAccess()) {
        const p = document.createElement("p");
        p.style.color = "white";
        p.style.display = "inline"
        p.textContent = `Logado como ${getUsername()}`
        btnLoginEl.replaceWith(p);

        btnCartEl.classList.remove("hidden");
        btnPedidosEl.classList.remove("hidden")

        if (getIsAdmin()) {
            btnSnackManageEl.classList.remove("hidden")
        }
    }

}

btnHomeEl.addEventListener("click", () => {
    loadPage(pages[0]);
    removeSelectionOfButtons();
    btnHomeEl.classList.add("selected")
});

btnCardapioEl.addEventListener("click", () => {
    loadPage(pages[1]);
    removeSelectionOfButtons();
    btnCardapioEl.classList.add("selected")
});

btnPedidosEl.addEventListener("click", () => {
    loadPage(pages[2]);
    removeSelectionOfButtons();
    btnPedidosEl.classList.add("selected")
});

btnCartEl.addEventListener("click", () => {
    loadPage(pages[6]);
    loadItemsOfCart();
    removeSelectionOfButtons()
    btnCartEl.classList.add("selected")
})

async function loadOrderConfirmationPage(id) {
    loadPage(pages[3]);
    await setSnackSelected(id);
    fillOrderConfirmationPage();
}

btnSnackManageEl.addEventListener("click", () => {
    loadPage(pages[4]);
    removeSelectionOfButtons();
    btnSnackManageEl.classList.add("selected");
});

btnLoginEl.addEventListener("click", () => {
    loadPage(pages[5]);
    removeSelectionOfButtons();
    btnLoginEl.classList.add("selected");
})

btnLogoutEl.addEventListener("click", () => {
    logout();
})

async function setSnackSelected(id) {
    this.snackSelected = await getSnack(id);
}

function getSnackSelected() {
    return this.snackSelected;
}


function loadPage(page) {
    hideSections();
    if (!page.loaded) {
        fetch(page.html).then(response => response.text())
            .then(html => {
                page.section.innerHTML = html;
                if (page.script) {
                    let script = document.createElement('script');
                    script.src = page.script;
                    document.body.appendChild(script);
                }
                page.loaded = true;
            })
    }
    page.section.style.display = "block"
}

function hideSections() {
    pages.forEach(page => {
        page.section.style.display = 'none'
    })
}

function removeSelectionOfButtons() {
    buttonsHeader.forEach(btn => {
        btn.classList.remove("selected")
    })
}

const modalEl = document.getElementById('modal');

function showModal({ title, message, icon, fn }) {
    modalEl.classList.remove("hidden");
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-icon").innerText = icon

    document.getElementById('close-modal')
        .replaceWith(document.getElementById('close-modal').cloneNode(true));

    document.getElementById('close-modal').addEventListener("click", () => {
        fn();
        modalEl.classList.add("hidden");
    });
}

(() => {
    verifyIfIsLoggedIn();
    btnHomeEl.click()
})()