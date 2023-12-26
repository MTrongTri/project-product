import { updateQuantityCart } from "./common.js";
import { randomProduct } from "./common.js";

// Load cart
const emptyCart = document.querySelector(".cart-empty");
const haveProductsCart = document.querySelector(".main-have-products");

renderCart();
function renderCart() {
  const productCart = JSON.parse(localStorage.getItem("productCart"));
  if (productCart.length > 0) {
    emptyCart.classList.add("d-none");
    haveProductsCart.classList.remove("d-none");

    let item = "";
    productCart.forEach((product, index) => {
      item += `
            <div class="intended-product">
              <div class="item-info">
                <label class="check-product" for="">
                  <input class="select-product" type="checkbox" value ="${index}" />
                </label>
                <a href="/detail-product.html?id=${product.id}"" class="link-product">
                  <img src="${product.linkImg}" alt="" />
                </a>
                <div class="name-product"><a href="/detail-product.html?id=${product.id}">${product.name}</a></div>
              </div>
      
              <div class="item-price">${product.priceSummary}</div>
      
              <div class="item-quantity">
                <button class="decrease" disabled>
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input type="text" value="${product.quantityProduct}" disabled />
                <button class="increase">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
      
              <div class="item-subtotal">${product.priceSummary}</div>
      
              <button class="remove-product">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          `;
    });

    haveProductsCart.innerHTML = `
        <div class="main-left">
          <div class="cart-header">
          <label class="check-all-products" for="">
              <input type="checkbox" />
              <span class="select-all-text">Tất cả (${productCart.length} sản phẩm)</span>
          </label>
          <span>Đơn giá</span>
          <span>Số lượng</span>
          <span>Thành tiền</span>
          <button class="remove-all">
              <i class="fa-regular fa-trash-can"></i>
          </button>
          </div>
      
          <div class="intended-products">
          ${item}
          </div>
        </div>
      
        <div class="main-right">
        <div class="coupon">
          <div class="coupon-header">
            <div class="coupon-header-title">Khuyến mãi</div>
            <div class="coupon-usage">
              <span>Có thể chọn 2</span>
              <span><i class="fa-solid fa-circle-exclamation"></i></span>
            </div>
          </div>
      
          <div class="coupon-view-all">
            <span class="coupon-icon"
              ><i class="fa-solid fa-ticket"></i
            ></span>
            <span>Chọn hoặc nhập khuyến mãi khác</span>
          </div>
        </div>
      
        <div class="price-summary">
          <ul class="price-items">
            <li class="price-item">
              <div class="price-text">Tạm tính</div>
              <div class="price-value">0đ</div>
            </li>
            <li class="price-item">
              <div class="price-text">Giảm giá</div>
              <div class="price-value">0đ</div>
            </li>
          </ul>
          <div class="price-total">
            <div class="price-text">Tổng tiền</div>
            <div class="price-final">0đ</div>
          </div>
        </div>
        <button class="btn-buy-final">Mua hàng (0)</button>
      </div>
      
        `;
    //add event
    const btnDeleteProductCart = document.querySelectorAll(".remove-product");
    btnDeleteProductCart.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        deleteProductCart(index);
        updateQuantityCart();
      });
    });

    // delete select
    const btnDeleteAllProduct = document.querySelector(".remove-all");
    btnDeleteAllProduct.addEventListener("click", () => {
      const inputChecked = document.querySelectorAll(
        ".check-product input:checked"
      );
      const valueSelect = [...inputChecked].map((item) => Number(item.value));

      if (!inputChecked.length) {
        const toast = document.querySelector(".toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 1200);
      } else {
        const productCart = JSON.parse(localStorage.getItem("productCart"));
        const newProductCart = productCart.filter(
          (product, index) => !valueSelect.includes(index)
        );

        localStorage.setItem("productCart", JSON.stringify(newProductCart));
        renderCart();
        updateQuantityCart();
      }
    });

    //select all
    const checkboxAll = document.querySelector(".check-all-products input");
    const allCheckbox = document.querySelectorAll(".select-product");

    allCheckbox.forEach((item) => {
      item.addEventListener("change", () => {
        const isAllChecked = [...allCheckbox].every(
          (item) => item.checked == true
        );
        checkboxAll.checked = isAllChecked;

        getTotalPrice();
      });
    });

    function getTotalPrice() {
      let totalPrice = 0;
      const itemsChecked = document.querySelectorAll(".select-product:checked");
      const buyFinal = document.querySelector(".btn-buy-final");
      buyFinal.textContent = `Mua hàng (${itemsChecked.length})`;

      itemsChecked.forEach((item) => {
        const itemSubtotal = item
          .closest(".intended-product")
          .querySelector(".item-subtotal");

        let price = Number(
          itemSubtotal.textContent.replace(/\./g, "").replace("đ", "")
        );

        totalPrice += price;
      });

      const valuePrice = document.querySelector(".price-value");
      const valuePriceFinal = document.querySelector(".price-final");

      valuePriceFinal.classList.remove("d-none");
      valuePrice.textContent = totalPrice.toLocaleString("vi-VN") + "đ";
      valuePriceFinal.textContent = totalPrice.toLocaleString("vi-VN") + "đ";
    }

    checkboxAll.addEventListener("change", function () {
      const setValueSelect = (value) => {
        [...allCheckbox].forEach((item) => (item.checked = value));
      };

      const listInPutQuanTityChecked = [];

      if (this.checked) {
        setValueSelect(true);
        getTotalPrice(listInPutQuanTityChecked);
      } else {
        setValueSelect(false);
        const valuePrice = document.querySelector(".price-value");
        const valuePriceFinal = document.querySelector(".price-final");

        valuePrice.textContent = "0đ";
        valuePriceFinal.textContent = "0đ";
      }
    });
    // quantity change
    const itemQuantity = document.querySelectorAll(".item-quantity");
    itemQuantity.forEach((item) => {
      const decrease = item.querySelector(".decrease");
      const increase = item.querySelector(".increase");
      const inputQuantity = item.querySelector("input");
      const subtotal = item.parentElement.querySelector(".item-subtotal");
      let price = Number(
        subtotal.textContent.replace(/\./g, "").replace("đ", "")
      );
      let quantity = 1;

      decrease.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          decrease.disabled = quantity === 1;
          inputQuantity.value = quantity;
          subtotal.innerHTML = (price * quantity).toLocaleString("vi-VN") + "đ";
        }
      });

      increase.addEventListener("click", () => {
        quantity++;
        decrease.disabled = false;
        inputQuantity.value = quantity;
        subtotal.innerHTML = (price * quantity).toLocaleString("vi-VN") + "đ";
      });
    });
  } else {
    emptyCart.classList.remove("d-none");
    haveProductsCart.innerHTML = "";
  }
}

//Delete product

function deleteProductCart(indexDelete) {
  const newProductCart = JSON.parse(localStorage.getItem("productCart")).filter(
    (product, index) => index != indexDelete
  );
  localStorage.setItem("productCart", JSON.stringify(newProductCart));
  renderCart();
}

randomProduct(-1);
