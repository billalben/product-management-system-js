"use strict";

const productsExample = [
  {
    title: "macbook pro",
    category: "laptop",
    price: 2000,
    ads: 50,
    discount: 10,
    taxes: 20,
    totalPrice: 2060,
  },
  {
    title: "iphone 12",
    category: "smartphone",
    price: 1000,
    ads: 20,
    discount: 5,
    taxes: 10,
    totalPrice: 1025,
  },
  {
    title: "ipad pro",
    category: "tablet",
    price: 800,
    ads: 10,
    discount: 2,
    taxes: 8,
    totalPrice: 816,
  },
  {
    title: "apple watch",
    category: "smartwatch",
    price: 400,
    ads: 5,
    discount: 1,
    taxes: 4,
    totalPrice: 408,
  },
  {
    title: "samsumg galaxy s21",
    category: "smartphone",
    price: 900,
    ads: 10,
    discount: 5,
    taxes: 9,
    totalPrice: 914,
  },
  {
    title: "samsumg galaxy tab",
    category: "tablet",
    price: 500,
    ads: 5,
    discount: 2,
    taxes: 5,
    totalPrice: 508,
  },
  {
    title: "asus zenbook",
    category: "laptop",
    price: 1500,
    ads: 30,
    discount: 5,
    taxes: 15,
    totalPrice: 1540,
  },
  {
    title: "asus rog phone",
    category: "smartphone",
    price: 700,
    ads: 10,
    discount: 5,
    taxes: 7,
    totalPrice: 712,
  },
  {
    title: "asus zenwatch",
    category: "smartwatch",
    price: 300,
    ads: 5,
    discount: 1,
    taxes: 3,
    totalPrice: 307,
  },
];

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

let createOrUpdate = "create";
let updateId = null;

const btnsFilter = document.querySelectorAll("[data-search-filter] button");
btnsFilter[0].classList.add("active");

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
} else {
  dataProducts = productsExample;
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

const showProducts = (dataProducts) => {
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
          <button onclick="updateProduct(${id})" data-update>Update</button>
        </td>
        <td>
          <button onclick="deleteProduct(${id})" data-delete>Delete</button>
        </td>
      </tr>
    `;

    $tableBody.innerHTML += table;
  });

  $deleteAllBtn.textContent = `Delete All ${dataProducts.length}`;
  $deleteAllBtn.style.display = "block";
};

$submitBtn.addEventListener("click", () => {
  const newProduct = {
    title: $titleInput.value,
    price: parseInt($priceInput.value) || 0,
    taxes: parseInt($taxesInput.value) || 0,
    ads: parseInt($adsInput.value) || 0,
    discount: parseInt($discountInput.value) || 0,
    category: $categoryInput.value,
    totalPrice: parseInt($totalPrice.textContent) || 0,
  };

  if (checkInputBeforeSubmit(newProduct)) {
    alert("Please fill title, input might be not minus");
    return;
  }

  if (createOrUpdate === "create") {
    $totalPrice.style.backgroundColor = "#a00d02";
    const countInput = parseInt($countInput.value);

    if (countInput > 1) {
      for (let i = 0; i < countInput; i++) dataProducts.push(newProduct);
    } else {
      dataProducts.push(newProduct);
    }
  } else if (createOrUpdate === "update") {
    dataProducts[updateId] = newProduct;
    createOrUpdate = "create";
    $submitBtn.textContent = "Create";
    $countInput.style.display = "block";
  }

  localStorage.setItem("products", JSON.stringify(dataProducts));

  clearData();
  clearTableBody();
  showProducts(dataProducts);
});

showProducts(dataProducts);

const deleteProduct = (id) => {
  dataProducts.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(dataProducts));

  clearTableBody();
  showProducts(dataProducts);
};

const clearTableBody = () => {
  $tableBody.innerHTML = "";
};

$deleteAllBtn.addEventListener("click", () => {
  localStorage.setItem("products", JSON.stringify([]));
  clearTableBody();
  dataProducts = [];
  $deleteAllBtn.style.display = "none";
});

const updateProduct = (id) => {
  $titleInput.value = dataProducts[id].title;
  $priceInput.value = dataProducts[id].price;
  $taxesInput.value = dataProducts[id].taxes;
  $adsInput.value = dataProducts[id].ads;
  $discountInput.value = dataProducts[id].discount;
  $totalPrice.textContent = dataProducts[id].totalPrice;
  $categoryInput.value = dataProducts[id].category;
  $countInput.style.display = "none";

  $submitBtn.textContent = "Update";
  createOrUpdate = "update";
  updateId = id;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

let searchMood = "title";
const $searchInput = document.querySelector("[data-search-input]");

const getSearchMood = (mood) => {
  mood === "searchCategory"
    ? (searchMood = "category")
    : (searchMood = "title");

  $searchInput.placeholder = `Search by ${searchMood}`;
  $searchInput.focus();
  $searchInput.value = "";
};

const debounce = (func, delay = 500) => {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args); // Call the original function with arguments
    }, delay);
  };
};

const searchProduct = function () {
  // console.log($searchInput.value); // console.log(this.value);

  const noProducts = `<tr><td colspan="10" class="no-products">No product found</td></tr>`;
  const searchValue = $searchInput.value.trim().toLowerCase();
  let filteredProducts = null;

  if (searchValue === "") {
    clearTableBody();
    showProducts(dataProducts);
    return;
  }

  if (searchMood === "category") {
    filteredProducts = dataProducts.filter((product) =>
      product.category.toLowerCase().includes(searchValue)
    );

    if (filteredProducts.length === 0) {
      clearTableBody();
      $tableBody.innerHTML = noProducts;
    } else {
      clearTableBody();
      showProducts(filteredProducts);
    }
  } else {
    filteredProducts = dataProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );

    if (filteredProducts.length === 0) {
      clearTableBody();
      $tableBody.innerHTML = noProducts;
    } else {
      clearTableBody();
      showProducts(filteredProducts);
    }
  }
};

$searchInput.addEventListener("input", debounce(searchProduct));

btnsFilter.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnsFilter.forEach((btn) => btn.classList.toggle("active"));
    searchProduct();
  });
});

const checkInputBeforeSubmit = (product) => {
  return (
    product.title === "" ||
    typeof product.price !== "number" ||
    product.price < 0 ||
    typeof product.taxes !== "number" ||
    product.taxes < 0 ||
    typeof product.ads !== "number" ||
    product.ads < 0 ||
    typeof product.discount !== "number" ||
    product.discount < 0
  );
};
