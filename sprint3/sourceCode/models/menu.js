let menus = [
  // {name: "ผัดกระเพรา", category: 1, price: 50}, 
  // {name: "ผัดกระเพรา", category: 1, price: 50}, 
  // {name: "ผัดกระเพรา", category: 1, price: 50}
];

let nextMenuId = 1;

class Menu {
  constructor(name, category, price) {
    this.id = nextMenuId++;
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

module.exports = {
  getAll: () => menus,
  showAll: () => {
    return menus.map(menu => {
      const CategoryMenu = require('./categoryMenu');
      const categoryData = CategoryMenu.getAll().find(cat => cat.id === menu.category);

      return {
        ...menu,
        category: categoryData || null 
      };
    });
  },
  getMenuCount: ()=> menus.length,
  create: (name, category, price) => {
    const CategoryMenu = require('./categoryMenu');
    const isHasCat = CategoryMenu.getAll().some(cat => cat.id === category);
      if (isHasCat) {
        const menu = new Menu(name, category, price);
        menus.push(menu);
        return menu;
      }

      return null;
  },
  selectById: (id) => {
    const index = menus.findIndex(item => item.id === id);

    if (index !== -1) {
      const selected = menus[index]; 
      return selected;
    }
    
    return null;
  },
  deleteById: (id) => {
    const index = menus.findIndex(item => item.id === id);

    if (index !== -1) {
      const deleted = menus.splice(index, 1)[0]; 
      return deleted;
    }
  
    return null;
  },
  updateById: (id, newName, newCategory, newPrice) => {
    const menu = menus.find(m => m.id === id);

    if (menu) {
      menu.name = newName ?? menu.name; 
      menu.category = newCategory ?? menu.category;
      menu.price = newPrice ?? menu.price;
      
      return menu;
    }
    return null;
  },
  clearAll: () => {
    menus.length = 0;
    nextMenuId = 1;
  }
};