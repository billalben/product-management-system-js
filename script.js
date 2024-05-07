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

console.log(dataProducts);

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

  dataProducts.push(newProduct);
  localStorage.setItem("products", JSON.stringify(dataProducts));

  clearData();

  console.log(newProduct);
});
