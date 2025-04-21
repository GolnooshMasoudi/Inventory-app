const products = [
  {
    id: 1,
    title: "React.js",
    description: "frontend",
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    description: "backend",
    createdAt: "2021-09-31T15:02:00.561Z",
  },
  {
    id: 3,
    title: "Vue.js",
    description: "frontend",
    createdAt: "2021-11-31T15:02:00.411Z",
  },
];
const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of application",
    createdAt: "2021-08-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backend of application",
    createdAt: "2021-07-31T15:02:00.411Z",
  },
];

export default class Storage {
  //add new category
  //save
  //getAll categories
  //delete
  //update to local storage

  static getAllCategories() {
    //products , categories ==> local stoarage ==>
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    //sort => desending
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryTosave) {
    const savedCategories = Storage.getAllCategories();
    // edit => ...save
    // new  => ...save

    const existedItem = savedCategories.find((c) => c.id === categoryTosave.id);
    if (existedItem) {
      //edit
      existedItem.title = categoryTosave.title;
      existedItem.description = categoryTosave.description;
    } else {
      //new
      categoryTosave.id = Date.now(); // similar to:  new Date().getTime()
      categoryTosave.createdAt = new Date().toISOString();

      savedCategories.push(categoryTosave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    //sort => desending
    return savedProducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
  }
  static saveProduct(productTosave) {
    const savedProducts = Storage.getAllProducts();
    // edit => ...save
    // new  => ...save

    const existedItem = savedProducts.find((c) => c.id === productTosave.id);
    if (existedItem) {
      //edit
      existedItem.title = productTosave.title;
      existedItem.quantity = productTosave.quantity;
      existedItem.category = productTosave.category;
    } else {
      //new
      productTosave.id = new Date().getTime();
      productTosave.createdAt = new Date().toISOString();

      savedProducts.push(productTosave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}
