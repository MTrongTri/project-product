import { products } from "./data.js";
import { apendProduct } from "./common.js";

window.addEventListener("load", () => {
  if (!localStorage.getItem("productCart")) {
    localStorage.setItem("productCart", JSON.stringify([]));
  }
});

// Load product
function getDataProduct(limit, page, category, products) {
  let filterProduct = !!category
    ? products.filter((product) => product.type == category)
    : products;

  const dataProduct = filterProduct.slice(limit * (page - 1), limit * page);

  const totalPages = Math.ceil(filterProduct.length / limit);
  return {
    dataProduct,
    totalPages,
  };
}

function renderProducts(dataProduct) {
  const mainProduct = document.querySelector(".main");
  mainProduct.innerHTML = "";
  dataProduct.forEach(function (product) {
    apendProduct(mainProduct, product);
  });
}

//Pagination
const pagination = document.querySelector(".pagination");

element(1, "");
function element(page, category = "") {
  const { dataProduct, totalPages } = getDataProduct(
    12,
    page,
    category,
    products
  );
  pagination.innerHTML = "";
  let pageItem = "";
  let activeLi;
  if (page > 1) {
    pageItem += `<li class="page-item page-arrow-left">
    <i class="fa-solid fa-angle-left"></i>
  </li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i == page) {
      activeLi = "page-active";
    } else {
      activeLi = "";
    }
    pageItem += `<li class="page-item page-${i} ${activeLi}">${i}</li>`;
  }

  if (page < totalPages) {
    pageItem += `<li class="page-item page-arrow-right">
    <i class="fa-solid fa-angle-right"></i>
  </li>`;
  }

  pagination.innerHTML = pageItem;

  //add event
  const prePage = document.querySelector(".page-arrow-left");
  const nextPage = document.querySelector(".page-arrow-right");

  if (prePage) {
    prePage.addEventListener("click", function () {
      element(page - 1, category);
    });
  }

  if (nextPage) {
    nextPage.addEventListener("click", function () {
      element(page + 1, category);
    });
  }

  const pages = document.querySelectorAll(
    ".page-item:not(.page-arrow-left):not(.page-arrow-right)"
  );
  pages.forEach((page) => {
    page.addEventListener("click", function () {
      document.querySelector(".page-active").classList.remove("page-active");
      page.classList.add("page-active");
      page = Number(page.textContent);
      element(page, category);
    });
  });
  renderProducts(dataProduct);
}

//category
const btnsFilter = document.querySelectorAll(".filter-product-btn");
btnsFilter.forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelector(".filter-active-btn")
      .classList.remove("filter-active-btn");
    btn.classList.add("filter-active-btn");

    const category = btn.getAttribute("type-filter");
    element(1, category);
  });
});
