"use strict";

const basketTotalValueEl = document.querySelector(".basketTotalValue");
const basketTotalDivEl = document.querySelector(".basketTotal");
const basketCountItemsEl = document.querySelector(".cartIconWrap span");
const basketEl = document.querySelector(".basket");


document.querySelector(".cartIcon").addEventListener("click", () =>
  basketEl.classList.toggle("hidden")
);


const basket = {
  products: {},
  _totalCount: 0,
  _totalPrice: 0,

  addToCart(productDataSet) {
    if (!(productDataSet["id"] in this.products)) {
      this.products[productDataSet["id"]] = { ...productDataSet, count: 0 };
    }
    this.products[productDataSet["id"]].count++;
    this.calculateStat();
    this.renderProductInBasket(productDataSet["id"]);
  },

  setTotalCount() {
    let count = 0;
    for (const product of Object.values(this.products)) {
      count += product.count;
    }
    this._totalCount = count;
  },

  getTotalCount() {
    return this._totalCount;
  },

  setTotalPrice() {
    this._totalPrice = Object.values(this.products).reduce((acc, product) => {
      return acc + product.count * +product.price;
    }, 0);
  },

  getTotalPrice() {
    return this._totalPrice;
  },

  calculateStat() {
    this.setTotalPrice();
    this.setTotalCount();
  },

  renderProductInBasket(id) {
    basketTotalValueEl.innerText = this._totalPrice.toFixed(2);
    const basketRowEl = basketEl.querySelector(
      `.basketRow[data-productId="${id}"]`
    );
    if (!basketRowEl) {
      this.renderNewProductInBasket(id);
      return;
    }
    basketRowEl.querySelector(".productCount").innerText =
      this.products[id].count;
    basketRowEl.querySelector(".productTotalRow").innerText =
      this.products[id].count * +this.products[id].price;
  },

  renderNewProductInBasket(productId) {
    const productRow = `
    <div class='basketRow' data-productId='${productId}'>
      <div>${this.products[productId].name}</div>
      <div>
        <span class='productCount'>${this.products[productId].count}</span> шт. 
      </div>
        <div>$${this.products[productId].price}</div> 
      <div>
        $<span class="productTotalRow">
         ${+this.products[productId].price * this.products[productId].count}
        </span>
      </div> 
    </div>
    `;
    basketTotalDivEl.insertAdjacentHTML("beforebegin", productRow);
  },
};

document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if (!event.target.closest(".addToCart")) {
    return;
  }

  basket.addToCart(event.target.closest(".featuredItem").dataset);
  basketCountItemsEl.innerText = basket.getTotalCount();
});
