import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.addNewProduct(e);
      this.products = [];
    });
  }
  setAp() {
    this.products = Storage.getAllProducts();
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
    this.createProductsList();
    console.log(this.products);
  }

  createProductsList() {
    // Request a weekday along with a long date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let result = "";
    this.products.forEach((item) => {
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
              class="flex items-center justify-center text-red-200 font-normal border px-3 py-0.5 rounded-xl border-red-400"
            data-id=${item.id}>
              delete
            </button>
          </div>
        </div>`;
    });
    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;
  }
}

export default new ProductView();
