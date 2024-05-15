"use strict";

const $titleInput = document.querySelector("[data-input-title]");
const $priceInput = document.querySelector("[data-input-price]");
const $taxesInput = document.querySelector("[data-input-tax]");
const $adsInput = document.querySelector("[data-input-ads]");
const $discountInput = document.querySelector("[data-input-discount]");
const $totalPrice = document.querySelector("[data-total-price]");
const $countInput = document.querySelector("[data-input-count]");
const $categoryInput = document.querySelector("[data-input-category]");
const $submitBtn = document.querySelector("[data-submit-btn]");
const $tableBody = document.querySelector("tbody");
const $deleteAllBtn = document.querySelector("[data-delete-all]");

const getTotalPrice = () => {
  if ($priceInput.value === "") {
    $totalPrice.style.backgroundColor = "#a00d02";
    $totalPrice.textContent = "0";
    return;
  }

  const totalPrice =
    +$priceInput.value +
    +$taxesInput.value +
    +$adsInput.value -
    +$discountInput.value;

  $totalPrice.textContent = totalPrice;

  $totalPrice.style.backgroundColor = "#040";
};

let dataProducts = [];

if (localStorage.getItem("products")) {
  dataProducts = JSON.parse(localStorage.getItem("products"));
}

const clearData = () => {
  $titleInput.value = "";
  $priceInput.value = "";
  $taxesInput.value = "";
  $adsInput.value = "";
  $discountInput.value = "";
  $totalPrice.textContent = "0";
  $countInput.value = "";
  $categoryInput.value = "";
};

const showData = () => {
  if (dataProducts.length === 0) {
    $deleteAllBtn.style.display = "none";
    return;
  }

  dataProducts.forEach((product, id) => {
    let table = `
      <tr>
        <td>${id}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.totalPrice}</td>
        <td>${product.category}</td>
        <td>
          <button data-update>Update</button>
        </td>
        <td>
          <button onclick="deleteProduct(id)" data-delete>Delete</button>
        </td>
      </tr>
    `;

    $tableBody.innerHTML += table;
  });

  $deleteAllBtn.textContent = `Delete All ${dataProducts.length}`;
  $deleteAllBtn.style.display = "block";
};

$submitBtn.addEventListener("click", () => {
  const title = $titleInput.value;
  const price = $priceInput.value;
  const taxes = $taxesInput.value;
  const ads = $adsInput.value;
  const discount = $discountInput.value;
  const count = $countInput.value;
  const category = $categoryInput.value;
  const totalPrice = parseFloat($totalPrice.textContent);

  const newProduct = {
    title,
    price,
    taxes,
    ads,
    discount,
    count,
    category,
    totalPrice,
  };

  if (count > 1) {
    for (let i = 0; i < count; i++) dataProducts.push(newProduct);
  } else {
    dataProducts.push(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(dataProducts));

  clearData();
  clearTableBody();
  showData();
});

showData();

const deleteProduct = (id) => {
  dataProducts.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(dataProducts));

  clearTableBody();
  showData();
};

const clearTableBody = () => {
  $tableBody.innerHTML = "";
};

$deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("products");
  clearTableBody();
  dataProducts = [];
  $deleteAllBtn.style.display = "none";
});
