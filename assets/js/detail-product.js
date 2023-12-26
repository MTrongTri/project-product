import { products } from "./data.js";
import { updateQuantityCart } from "./common.js";
import { randomProduct } from "./common.js";
// Load Product
const productBriefing = document.querySelector(".product-briefing");
const urlParams = new URLSearchParams(window.location.search);
const idProduct = urlParams.get("id");

products.forEach((product) => {
  if (product.id == idProduct) {
    const price = Number(product.price).toLocaleString("vi-VN");

    productBriefing.innerHTML = `
      <div class="main-product">
      <img
        class="img-main-product"
        src="${product.linkImg}"
      />
      </div>

      <div class="detail-product">
      <h5 class="name-product-detail">${product.name}</h5>
      <div class="rating">
        <span>5.0</span>
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <span class="number"> (100) </span>
        <span class="quantity-sold">Đã bán 100</span>
      </div>
      <p class="detail-description">
      ${product.description}
      </p>
      <div class="detail-product-option">
        <div class="transport">
          <h5 class="title">Thông tin vận chuyển</h5>
          <div class="current-location">
            <i class="fa-solid fa-truck"></i>
            Giao hàng từ TP Phan Thiết, Bình Thuận
            <div class="transport-fee">
              <img src="../../assets/img/freeship.png" alt="" />
              <span>Miễn phí vận chuyển</span>
            </div>
          </div>
        </div>
        <div class="quantity-input">
          <h5>Số lượng</h5>
          <div>
            <button class="decrease" disabled>
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="text" value="1" disabled />
            <button class="increase">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div class="price">
          <h5>Tạm tính</h5>
          <span>${price}đ</span>
        </div>

        <div class="btns">
          <button class="btn-buy">Đặt hàng</button>
          <button class="btn-add-to-cart">Thêm vào giỏ hàng</button>
        </div>
      </div>
`;
  }
});

// quantity change
const decrease = document.querySelector(".decrease");
const increase = document.querySelector(".increase");
const inputQuantity = document.querySelector(".quantity-input input");
const priceE = document.querySelector(".price span");
let price = document.querySelector(".price span").textContent;
let quantity = 1;

price = Number(price.replace(/\./g, "").replace("đ", ""));

decrease.addEventListener("click", function () {
  if (quantity == 1) {
    decrease.disabled = true;
  }

  if (quantity > 1) {
    quantity--;
  }

  inputQuantity.value = quantity;
  priceE.innerHTML = (price * quantity).toLocaleString("vi-VN") + "đ";
});

increase.addEventListener("click", function () {
  decrease.disabled = false;
  quantity++;

  inputQuantity.value = quantity;
  priceE.innerHTML = (price * quantity).toLocaleString("vi-VN") + "đ";
});

// add to cart
let productCart = JSON.parse(localStorage.getItem("productCart")) || [];
const btnAddToCart = document.querySelector(".btn-add-to-cart");
btnAddToCart.addEventListener("click", function () {
  const name = document.querySelector(".name-product-detail").textContent;
  const priceSummary = document.querySelector(".price span").textContent;
  let quantityProduct = document.querySelector(".quantity-input input").value;
  const linkImg = document.querySelector(".img-main-product").src;
  const id = idProduct;

  const product = {
    id,
    name,
    priceSummary,
    quantityProduct,
    linkImg,
  };

  productCart.push(product);
  localStorage.setItem("productCart", JSON.stringify(productCart));
  updateQuantityCart();

  document.querySelector(".msg-add-to-card").classList.add("msg-show");
  setTimeout(function () {
    document.querySelector(".msg-add-to-card").classList.remove("msg-show");
  }, 2000);
  // window.location.href = `/cart.html`;
});

randomProduct(Number(idProduct));
