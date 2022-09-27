// 1- get total
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btnCreate = document.getElementById('btnCreate');
// let search = document.getElementById('search');
let inputsDiv = document.getElementById('inputs');
// let tbody = document.getElementById('tbody');
let btnDelete = document.getElementById('delete');
let btnUpdate = document.getElementById('update');
let btnDeleteAll = document.getElementById('btnDeleteAll');
let DeleteAllDiv = document.getElementById('DeleteAllDiv');
let productsCount = document.getElementById('productsCount');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let mode = 'create';
let Searchmode = 'title';

var temp;

// show_data();

var result;
function get_total() {
    if (price.value > 0) {
        result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        if (result < 0) {
            total.innerHTML = 'Not Allowed';
            total.style.backgroundColor = 'red';
        }
        else {
            total.innerHTML = result;
            total.style.backgroundColor = '#22a778';
        }
    }
    else {
        total.innerHTML = ' ';
        total.style.backgroundColor = 'rgb(234, 29, 70)';
    }

}

/*****************************************************************************************************************/


//2 - create product
// 3- save data into localstorage4
var dataPro;
if (localStorage.products != null) {
    dataPro = JSON.parse(localStorage.getItem('products'));
}
else {
    dataPro = [];
}
btnCreate.onclick = function () {
    var newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value > 0 && category.value != '' && count.value <= 100) {
        if (mode === 'create') {
            if (count.value > 0) {
                for (let i = 0; i < count.value; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro[temp] = newPro;
            document.location.reload();
        }
        document.location.reload();

    }
    else {
        // clear_data()

    }

    console.log(dataPro);
    localStorage.setItem('products', JSON.stringify(dataPro));
    console.log(JSON.parse(localStorage.getItem('data')));
}

// localStorage.clear();

// 4- clear inputs

function clear_data() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// 5- read

function show_data() {
    table = '';
    for (let i = 0; i < dataPro.length; i++) {

        table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <!-- <td>${dataPro[i].count}</td> -->
            <td>${dataPro[i].category}</td>
            <td><button onclick="update_data(${i})" class="actionBtn" id="btnUpdate">update</button></td>
            <td><button onclick="delete_data(${i})" class="actionBtn" id="btnDelete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

}

show_data()


// 6- count
// done in create function.


// 7- delete

function delete_data(id) {
    dataPro.splice(id, 1);
    localStorage.setItem('products', JSON.stringify(dataPro));
    document.location.reload();
}

function deleteAll() {
    if (dataPro.length > 0) {
        dataPro.length = 0;
        localStorage.setItem('products', JSON.stringify(dataPro));
        document.location.reload();
    }
}

// 8- update
function update_data(id) {
    title.value = dataPro[id].title;
    price.value = dataPro[id].price;
    taxes.value = dataPro[id].taxes;
    ads.value = dataPro[id].ads;
    discount.value = dataPro[id].discount;
    get_total();
    count.style.display = 'none'
    category.value = dataPro[id].category;
    btnCreate.innerHTML = 'Update';
    mode = 'update';
    temp = id;
    scroll({
        top: 0,
        behavior: 'smooth',
    })

}

// 9- search

function getSearchMode(id) {
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        Searchmode = 'title';
        search.placeholder = 'Search by title';

    }
    else {
        Searchmode = 'category';
        search.placeholder = 'Search by Category';
    }
    search.focus();
    search.value = '';
    show_data();
}

function searchData(value) {
    let table = '';
    if (Searchmode === 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="update_data(${i})" class="actionBtn" id="btnUpdate">update</button></td>
                    <td><button onclick="delete_data(${i})" class="actionBtn" id="btnDelete">delete</button></td>
                    </tr>
                `;
            }
        }
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="update_data(${i})" class="actionBtn" id="btnUpdate">update</button></td>
                    <td><button onclick="delete_data(${i})" class="actionBtn" id="btnDelete">delete</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}