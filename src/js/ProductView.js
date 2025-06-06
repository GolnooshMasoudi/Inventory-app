import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
const productCounter = document.querySelector("#product-counter");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.addNewProduct(e);
    });
    searchInput.addEventListener("input", (e) => this.searchProducts(e));

    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    // deleteProductListBtn.addEventListener("click", (e) =>
    //   this.deleteProductList(e)
    // );

    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
    this.updateProductCount();
  }

  addNewProduct(e) {
    e.preventDefault();
    const productTitle = document.querySelector("#product-title").value;
    const productQuantity = document.querySelector("#product-quantity").value;
    const selectedCategory = document.querySelector("#product-category").value;
    if (!productTitle || !productQuantity || !selectedCategory) return;
    Storage.saveProduct({
      title: productTitle,
      category: selectedCategory,
      quantity: productQuantity,
    });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    // console.log(this.products);
    this.updateProductCount();
  }

  createProductsList(products) {
    // Request a weekday along with a long date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );

      result += `<div class="flex items-center justify-between align-middle mb-4">
          <span class="text-slate-400">${item.title}</span>
          <div class="flex items-center flex-row gap-2 align-middle gap-x-3">
            <span class="text-slate-400">${new Date(item.createdAt).toLocaleDateString("sv-SE", options)}</span>
            <span
              class="block px-4 py-1 rounded-2xl border border-slate-500 text-slate-400"
              >${selectedCategory.title}</span
            >

            <span
              class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 borde-2 border-slate-400 text-slate-300 font-normal"
              >${item.quantity}</span
            >
            <button
              class="delete-product flex items-center justify-center text-red-200 font-normal border px-3 py-0.5 rounded-xl border-red-400"
            data-product-id=${item.id}>
              delete
            </button>
          </div>
        </div>`;
    });
    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;
    const deletBtns = [...document.querySelectorAll(".delete-product")];
    deletBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProductList(e));
    });
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(value);
    });

    this.createProductsList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    // console.log({ value });
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deleteProductList(e) {
    console.log("Clicked element:", e.target);
    console.log("Data ID:", e.target.dataset.productId);
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    this.updateProductCount();
  }
  updateProductCount() {
    productCounter.textContent = this.products.length;
  }
}
export default new ProductView();
