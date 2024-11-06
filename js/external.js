//selecting ele
let pName = document.getElementById("proName");
let pPrice = document.getElementById("proPrice");
let pCategory = document.getElementById("proCategory");
let pDesc = document.getElementById("proDesc");
let addBtn = document.getElementById("btn");
let searchPro = document.getElementById("proSearch");
let proContainer;

if (localStorage.getItem("products")) {
    proContainer = JSON.parse(localStorage.getItem("products"));
    disPro();
} else {
    proContainer = [];
}

function disPro() {
    let searchProcont = ``;
    for (let i = 0; i < proContainer.length; i++) {
        searchProcont += `
        <tr>
              <td>${i + 1}</td>
              <td>${proContainer[i].name} </td>
              <td>${proContainer[i].price}</td>
              <td>${proContainer[i].category}</td>
              <td>${proContainer[i].description}</td>
              <td>
                <button class="btn delete" onclick="delPro(${i})">Delete</button>
                <button class="btn update" onclick="getData(${i})">Update</button>
              </td>
            </tr>`
    }

    document.getElementById("tbody").innerHTML = searchProcont;
}

btn.onclick = function () { // علشان اانا شغال علي نفس الزرار وهو اللي هيعمل الاتنين فهشوف هيعمل ايه وبعدين اشغل انهي فانكشن
    if (btn.innerHTML == "Add Product") {
        addPro();
    }
    else {
        updatePro();
    }

}

function addPro() {
    let product = {
        name: pName.value,
        price: pPrice.value,
        category: pCategory.value,
        description: pDesc.value,
    }
    proContainer.push(product)
    localStorage.setItem("products", JSON.stringify(proContainer));
    disPro();
    clearInputs(); // Clear the input fields after adding a product

}

function sPro(term) {
    let searchProContainer = ``;
    for (let i = 0; i < proContainer.length; i++) {
        if (proContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchProContainer += `
            <tr>
                <td>${i + 1}</td>
                <td>${proContainer[i].name}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].category}</td>
                <td>${proContainer[i].description}</td>
                <td>
                  <button class="btn delete" onclick="delPro(${i})">Delete</button>
                  <button class="btn update" onclick="getData(${i})">Update</button>
                </td>
              </tr>
            `
        }
        document.getElementById("tbody").innerHTML = searchProContainer;
    }
}

searchPro.onkeyup = function () {
    sPro(this.value)
}
//event click
// addBtn.onclick = function () { //action on click
//     let products = {
//         name: pName.value,
//         price: pPrice.value,
//         category: pCategory.value,
//         description: pDesc.value
//     }
//     proContainer.push(products);
//     localStorage.setItem("products", JSON.stringify(proContainer));
//     localStorage.setItem("wishlist", JSON.stringify(proContainer));
//     // let pro = localStorage.getItem("products");
//     disPro();

//     // console.log(JSON.parse(pro));
// }

localStorage.removeItem("wishlist")

//delete function
function delPro(i) {
    proContainer.splice(i, 1); //كده احنا هنشيل من الارراي العنصر اللي الانديكس بتاعته واحد وهنشيل عنصر واحد بس  وهو دا
    localStorage.setItem("products", JSON.stringify(proContainer));
    disPro();
}

//update functions

function getData(i) { //كده الفانكشن دي بباصيلها الانديكي بتاخد معلومات الانديكس دي من الارراي وتطلعها تاني للانبوتس بتاعتي وكمان غيرت اسم الزرار يبقي ابديت ومسكت الانديكس دا معايا
    pName.value = proContainer[i].name;
    pPrice.value = proContainer[i].price;
    pCategory.value = proContainer[i].category;
    pDesc.value = proContainer[i].description;
    btn.innerHTML = "Update Product";
    currIndex = i;
}

function updatePro() {
    proContainer[currIndex] = {
        name: pName.value,
        price: pPrice.value,
        category: pCategory.value,
        description: pDesc.value
    }
    localStorage.setItem("products", JSON.stringify(proContainer));
    disPro();
    clearInputs(); // Clear the input fields after updating a product
    btn.innerHTML = "Add Product"; // Change the button text back to "Add Product"
}
// Helper function to clear inputs
function clearInputs() {
    pName.value = "";
    pPrice.value = "";
    pCategory.value = "";
    pDesc.value = "";
}