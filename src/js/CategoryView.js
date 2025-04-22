//title, description =>{ } => savedCategory => ...
import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategoryBtn = document.querySelector("#cancel-add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    // toggleAddCategoryBtn.addEventListener("click", (e) =>
    //   this.toggleAddCategory(e)
    // );
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategoryBtn.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );

    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    //update DOM : update select option in category
    this.createCategoriesList();
    //EMPTY the title and description after click on add new category btn
    categoryDescription.value = "";
    categoryTitle.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
  setApp() {
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
  }
  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">
                  select a category
                </option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-300" value="${element.id}">
                  ${element.title}
                </option>`;
    });
    const categoryDOM = document.getElementById("product-category");
    categoryDOM.innerHTML = result;
  }

  //   toggleAddCategory(e) {
  //     categoryWrapper.classList.toggle("hidden");
  //     toggleAddCategoryBtn.classList.toggle("hidden");
  //   }
  //   toggleAddCategory(e) {
  //     console.log("Event triggered:", e);
  //     categoryWrapper.classList.toggle("hidden");
  //     toggleAddCategoryBtn.classList.toggle("hidden");
  //   }
  toggleAddCategory(e) {
    e.preventDefault();
    console.log("Before toggle:", categoryWrapper.classList);
    categoryWrapper.classList.toggle("hidden");

    console.log("After toggle:", categoryWrapper.classList);

    // Force display property if Tailwind isn't applying `hidden` correctly
    categoryWrapper.style.display = categoryWrapper.classList.contains("hidden")
      ? "none"
      : "block";
  }
  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.toggle("hidden");
    categoryWrapper.style.display = categoryWrapper.classList.contains("hidden")
      ? "none"
      : "block";
  }
}

export default new CategoryView();
