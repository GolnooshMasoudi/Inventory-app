// target :
// 1. create category
// 2. creat product based on selected category
// 3. edit product
// 4. remove product
// 5. save product in local storage
//  --> storage class for handle application methods
//  --> ProductView class
//  --> CategoryView class
//  --> Main & App class
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  //setApp => categories : OK
  //   console.log(CategoryView);
  CategoryView.setApp();
  ProductView.setApp();
  // Create categorie's options
  CategoryView.createCategoriesList();
  // Create products's options
  ProductView.createProductsList(ProductView.products);
});
