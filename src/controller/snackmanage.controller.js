const listOfSnacksManageEl = document.getElementById("list-of-snack-manage");

const inputImageSnackFormEl = document.getElementById("input-image-snack-form");
const inputImageSnackUpdateFormEl = document.getElementById("input-image-update-snack-form");

const snackImagePreview = document.getElementById("snack-image-preview");
const updateSnackImagePreview = document.getElementById("update-snack-image-preview");

const btnShowFormSnack = document.getElementById("show-form-snack");

const btnCancelFormNewSnack = document.getElementById("btn-cancel-snack");
const btnCancelFormUpdateSnack = document.getElementById("btn-update-cancel-snack");

const insertSnackSection = document.getElementById("insert-snack-section");
const updateSnackSection = document.getElementById("update-snack-section");

const tableSnacksSection = document.getElementById("table-snacks-section");

const insertFormSnackEl = document.getElementById("insert-form-snack");
const updateFormSnackEl = document.getElementById("update-form-snack");

const btnInsertNewSnackEl = document.getElementById("btn-insert-snack");
const bntUpdateSnackEl = document.getElementById("btn-update-snack");

async function fillTableSnackManage() {
    const snacks = await getAllSnacks();
    listOfSnacksManageEl.innerText = "";
    snacks.forEach(snack => {
        const snackRow = createRowSnackManage(snack);
        listOfSnacksManageEl.insertAdjacentHTML("beforeend", snackRow);
    });
}

inputImageSnackFormEl.addEventListener("change", () => {
    fillImagePreview(inputImageSnackFormEl, snackImagePreview);
});

inputImageSnackUpdateFormEl.addEventListener("change", () => {
    fillImagePreview(inputImageSnackUpdateFormEl, updateSnackImagePreview);
})

function fillImagePreview(inputImage, imagePreview) {
    if (inputImage.files && inputImage.files[0]) {
        const imageReader = new FileReader();

        imageReader.onload = (image) => {
            imagePreview.src = image.target.result
        }

        imageReader.readAsDataURL(inputImage.files[0])
    }
}


function createRowSnackManage(snack) {
    const rowElement = `
    <tr class="bg-white border-b">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            ${snack.id}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            ${snack.name}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            R$ ${snack.value}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            ${snack.category}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            ${snack.status}
        </td>
        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
            <div class="flex space-x-2 justify-center">
                <button onclick="showFormToUpdateSnack(${snack.id})" type="button" class="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    EDIT 
                </button>
            </div>
        </td>
        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
            <div class="flex space-x-2 justify-center">
                <button onclick="confirmDelete(${snack.id})" type="button" class="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    DELETE
                </button>
            </div>
        </td>
    </tr class="bg-white border-b">
    `
    return rowElement;
}

async function confirmDelete(id) {
    const message = await deleteSnack(id);
    showModal({
        title: "Delete A Snack",
        message,
        icon: "[X - DELETE]",
        fn: () => {
            fillTableSnackManage();
            fillListOfSnacks();
        }
    });

}

btnShowFormSnack.addEventListener("click", (event) => {
    insertSnackSection.classList.remove("hidden");
    tableSnacksSection.classList.add("hidden");
});

btnCancelFormNewSnack.addEventListener("click", (event) => {
    showTableSnackSection();
});


btnCancelFormUpdateSnack.addEventListener("click", () => {
    showTableSnackSection();
})

function showTableSnackSection() {
    tableSnacksSection.classList.remove("hidden");
    insertSnackSection.classList.add("hidden");
    updateSnackSection.classList.add("hidden");
}


btnInsertNewSnackEl.addEventListener("click", (event) => {
    event.preventDefault();
    insertNewSnack();
});


async function insertNewSnack() {
    const formData = new FormData(insertFormSnackEl);
    formData.set("status", "available");

    const message = await insertNewSnackRequest(formData);
    if (message) {
        showModal({
            title: 'Insert new snack',
            message,
            icon: "[ I - INSERTED]",
            fn: () => {
                snackImagePreview.src = "";
                insertFormSnackEl.reset();
                fillTableSnackManage();
                fillListOfSnacks();
                btnCancelFormNewSnack.click();
            }
        })

    } else {
        alert("não foi possivel inserir!!!");
    }
}

bntUpdateSnackEl.addEventListener("click", (event) => {
    event.preventDefault();
    updateSnack();
})

async function updateSnack() {
    const formData = new FormData(updateFormSnackEl);
    formData.set("status", "available");

    console.log(formData.get("id"));

    const message = await updateSnackRequest(formData);

    if (message) {
        showModal({
            title: 'Update Snack',
            message,
            icon: "[ U - UPDATED]",
            fn: () => {
                updateSnackImagePreview.src = "";
                updateFormSnackEl.reset();
                fillTableSnackManage();
                fillListOfSnacks();
                btnCancelFormUpdateSnack.click();
            }
        })

    } else {
        alert("não foi possivel atualizar!!!");
    }
}


async function showFormToUpdateSnack(snackId) {
    const snackObject = await getSnack(snackId);
    console.log(snackObject)

    showUpdateSnackSection();
    fillUpdateForm(snackObject);
}

function fillUpdateForm(snack) {
    document.getElementById("input-update-id").value = snack.id;
    updateSnackImagePreview.src = snack.image;
    document.getElementById("update-name-snack").value = snack.name;
    document.getElementById("update-value-snack").value = snack.value;
    updateSnackSection.querySelector("#select-category").value = snack.category;
}

function showUpdateSnackSection() {
    updateSnackSection.classList.remove("hidden");
    tableSnacksSection.classList.add("hidden");
}

const modalReportEl = document.getElementById("modal-report");
const btnShowModalReportEl = document.getElementById("show-report")
const listOfSnacksFromReport = document.getElementById('list-of-snack-from-report');
const btnCloseModalReport = document.getElementById("btn-close-modal-report");

btnShowModalReportEl.addEventListener('click', async () => {
    modalReportEl.classList.remove('hidden');
    listOfSnacksFromReport.innerText = '';
    const snacksReport = await getReport();

    snacksReport.forEach(snack => {

        const snackReportRow = createRowReport(snack);
        listOfSnacksFromReport.insertAdjacentHTML('beforeend', snackReportRow);

    })

})

btnCloseModalReport.addEventListener('click', () => {
    modalReportEl.classList.add('hidden');
})

function createRowReport(snackReport) {
    const { name, value, quantidade, valorgerado } = snackReport;
    return `
    <tr
        class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            ${name}
        </th>
        <td class="px-6 py-4">
            R$ ${value.toFixed(2)}
        </td>
        <td class="px-6 py-4">
            ${quantidade}
        </td>
        <td class="px-6 py-4">
            R$ ${valorgerado.toFixed(2)}
        </td>
    </tr>
    `
}

(() => {
    fillTableSnackManage();
})()