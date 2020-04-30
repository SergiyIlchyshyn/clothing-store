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
            // let editButtons = Array.from(document.getElementsByClassName('btn-edit'));
            // editButtons.forEach(element => {
            //     element.onclick = showEditDialog;
            // });
            // let deleteButtons = Array.from(document.getElementsByClassName('btn-delete'));
            // deleteButtons.forEach(element => {
            //     element.onclick = showDeleteDialog;
            // });
        })
        .catch(err => alert(err));
}

window.onload = function() {
    console.log('hello');
    fillTable();
};