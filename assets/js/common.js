import { products } from "./data.js";
//Load quantity cart
updateQuantityCart();
export function updateQuantityCart() {
  const quantityCart = document.querySelector(".quantity-product-cart");
  const countProductCart = JSON.parse(localStorage.getItem("productCart"))
    ? JSON.parse(localStorage.getItem("productCart")).length
    : 0;

  quantityCart.textContent = countProductCart;
}

export function generateRandomNumbers(a, n, b) {
  let arrNumberRandom = [];
  while (arrNumberRandom.length < a) {
    let randomNum = Math.floor(Math.random() * n);
    if (randomNum !== b - 1 && !arrNumberRandom.includes(randomNum)) {
      arrNumberRandom.push(randomNum);
    }
  }
  return arrNumberRandom;
}

export function randomProduct(id) {
  const indexProductRandom = generateRandomNumbers(6, products.length, id);
  const productsRandom = products.filter((product, index) => {
    return indexProductRandom.includes(index);
  });

  const row = document.querySelector(".product-container .row");
  row.innerHTML = "";
  productsRandom.forEach((product) => {
    apendProduct(row, product);
  });
}

export function apendProduct(parent, product) {
  const divElement = document.createElement("div");
  divElement.classList.add("p-2", "col-sm-6", "col-md-4", "col-lg-2");

  const price = Number(product.price).toLocaleString("vi-VN");

  const card = document.createElement("div");
  card.className = "card";

  const cardLink = document.createElement("a");
  cardLink.className = "card-link";
  cardLink.href = `/detail-product.html?id=${product.id}`;

  const img = document.createElement("img");
  img.src = product.linkImg;
  img.className = "card-img-top";
  img.alt = "...";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardName = document.createElement("h5");
  cardName.className = "card-name";
  cardName.textContent = product.name;

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-description";
  cardDescription.textContent = product.description;

  const cardPrice = document.createElement("span");
  cardPrice.className = "card-price";
  cardPrice.textContent = `${price}đ`;

  const btnBuy = document.createElement("button");
  btnBuy.className = "btn btn-danger btn-buy";
  btnBuy.textContent = "Mua Ngay";

  cardBody.append(cardName, cardDescription, cardPrice, btnBuy);
  cardLink.append(img, cardBody);
  card.append(cardLink);
  divElement.append(card);

  parent.appendChild(divElement);
}
