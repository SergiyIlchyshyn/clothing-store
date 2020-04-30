let editDialog = {
    imagePath: null,
    title: null,
    description: null,
    price: null,
    color: null,
    size: null,
    materials: null,
    country: null,
    availability: null,
    season: null,
    saveButton: null
}
let createDialog = {
    imagePath: null,
    title: null,
    description: null,
    price: null,
    color: null,
    size: null,
    materials: null,
    country: null,
    availability: null,
    season: null,
    saveButton: null
}

function showEditDialog() {
    console.log(this.dataset.id);
    fetch(`/products/${this.dataset.id}`)
        .then(res => res.json())
        .then(res => {
            editDialog.title.value = res.title;
            editDialog.description.value = res.description;
            editDialog.imagePath.value = res.imagePath;
            editDialog.price.value = res.price;
            editDialog.color.value = res.color;
            // editDialog.size.value = res.size;
            editDialog.materials.value = res.materials;
            editDialog.country.value = res.country;
            // editDialog.availability.value = res.availability;
            // editDialog.season.value = res.season;
            editDialog.saveButton.dataset.id = this.dataset.id;
        })
        .catch(err => alert(err));
}

function showDeleteDialog() {
    // console.log(this.dataset.id);
    fetch(`/products/${this.dataset.id}`, {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(fillTable())
        .catch(err => alert(err));
}

function saveProduct() {
    let data = {
        title: editDialog.title.value,
        description: editDialog.description.value,
        imagePath: editDialog.imagePath.value,
        price: editDialog.price.value,
        color: editDialog.color.value,
        // size: editDialog.size.value,
        materials: editDialog.materials.value,
        country: editDialog.country.value,
        // availability: editDialog.availability.value,
        // season: editDialog.season.value
    };
    console.log(data);
    fetch(`/products/${this.dataset.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(fillTable())
        .catch(err => alert(err));
}

function fillTable() {
    let productsTableBody = document.getElementById('productsTable').getElementsByTagName('tbody')[0];

    fetch('/products')
        .then(res => res.json())
        .then(res => {
            let rows = '';
            for (const element of res) {
                rows += `<tr><td>${element.title}</td><td>${element.description}</td><td>${element.price}</td><td>${element.color}</td><td>${element.size}</td><td>${element.materials}</td>`;
                rows += `<td><button class="btn btn-primary btn-edit" data-id="${element._id}" data-toggle="modal" href='#editModal'>Edit</button> | `;
                rows += `<button class="btn btn-danger btn-delete" data-id="${element._id}" data-toggle="modal" href='#delModal'>Del</button></td></tr>`;
            }
            productsTableBody.innerHTML = rows;
            let editButtons = Array.from(document.getElementsByClassName('btn-edit'));
            editButtons.forEach(element => {
                element.onclick = showEditDialog;
            });
            let deleteButtons = Array.from(document.getElementsByClassName('btn-delete'));
            deleteButtons.forEach(element => {
                element.onclick = showDeleteDialog;
            });
        })
        .catch(err => alert(err));
}

window.onload = function() {
    fillTable();
    editDialog.title = this.document.getElementById('productTitle');
    editDialog.description = this.document.getElementById('productDescription');
    editDialog.imagePath = this.document.getElementById('productImage');
    editDialog.price = this.document.getElementById('productPrice');
    editDialog.color = this.document.getElementById('productColor');
    // editDialog.size = this.document.getElementById('tourRoute');
    editDialog.materials = this.document.getElementById('productMaterials');
    editDialog.country = this.document.getElementById('productCountry');
    // editDialog.availability = this.document.getElementById('tourDays');
    // editDialog.season = this.document.getElementById('tourPrice');
    editDialog.saveButton = this.document.getElementById('productSave');
    editDialog.saveButton.onclick = saveProduct;
};