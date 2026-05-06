let nextCategoryId = 1;

class CategoryMenu {
  constructor(name, canEdit = true) {
    this.id = nextCategoryId++;
    this.name = name;
    this.canEdit = canEdit;
  }
}

let categories = [
  new CategoryMenu("โปรโมชั่นวันนี้", false),
  new CategoryMenu("เมนูแนะนำ", false) 
];

module.exports = {
  getAll: () => categories,
  getCategoryMenuCount: ()=> categories.length,
  create: (name, canEdit) => {
    const isDuplicate = categories.some(item => item.name === name);

    if (!isDuplicate) {
      const categoryMenu = new CategoryMenu(name, canEdit);
      categories.push(categoryMenu);
      return true;
    }
    
    return false;
  },
  deleteById: (id) => {
    const Menu = require('./menu');

    const index = categories.findIndex(item => item.id === id);
    const isUsed = Menu.getAll().some(menu => menu.category === id);

    if (index !== -1 && categories[index].canEdit) {
      if (isUsed) {
        return null;
      }
      const deleted = categories.splice(index, 1)[0]; 
      return deleted;
    }
  
    return null;
  },
  updateById: (id, newName) => {
    const categoryMenu = categories.find(m => m.id === id);
    const isDuplicate = categories.some(item => item.name === newName);

    if (categoryMenu && !isDuplicate && categoryMenu.canEdit) {
        categoryMenu.name = newName ?? categoryMenu.name; 
      
        return categoryMenu;
    }
    return null;
  },
  clearAll: () => {
    categories.length = 0;
    nextCategoryId = 1; 
    
    categories.push(
      new CategoryMenu("โปรโมชั่นวันนี้", false),
      new CategoryMenu("เมนูแนะนำ", false)
    );
  },
};
