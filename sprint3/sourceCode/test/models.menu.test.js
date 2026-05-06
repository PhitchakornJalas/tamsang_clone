const Menu = require('../models/menu');

// Count Method
describe('Count Menu', () => {
    test('default menu count', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา", 1, 50);
      Menu.create("ผัดกระเพรา", 1, 50);
      Menu.create("ผัดกระเพรา", 1, 50);
      const menuCount = Menu.getMenuCount();
      expect(menuCount).toEqual(3);
    })

    test('creat menu count when not have category', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา", 3, 50);
      const menuCount = Menu.getMenuCount();
      expect(menuCount).toEqual(0);
    })

    test('clear menu and count', () => {
      Menu.clearAll();
      const menuCount = Menu.getMenuCount();
      expect(menuCount).toEqual(0);
    })
})

// Remove Menu
describe('Remove Menu', () => {
    test('remove menu by id 2', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const deleteMenu = Menu.deleteById(2)
      const menuCount = Menu.getMenuCount();
      expect(deleteMenu).toBeDefined();
      expect(deleteMenu.id).toEqual(2);
      expect(menuCount).toEqual(2);
    })

    test('remove menu by id 1', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const deleteMenu = Menu.deleteById(1)
      const menuCount = Menu.getMenuCount();
      expect(deleteMenu).toBeDefined();
      expect(deleteMenu.id).toEqual(1);
      expect(menuCount).toEqual(2);
    })

    test('remove menu by id 3', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const deleteMenu = Menu.deleteById(3)
      const menuCount = Menu.getMenuCount();
      expect(deleteMenu).toBeDefined();
      expect(deleteMenu.id).toEqual(3);
      expect(menuCount).toEqual(2);
    })

    test('remove menu by out of id', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const deleteMenu = Menu.deleteById(4)
      const menuCount = Menu.getMenuCount();
      expect(deleteMenu).toBeNull();
      expect(menuCount).toEqual(3);
    })
})

// Select Menu
describe('Select Menu', () => {
    test('select menu by id 2', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const selectMenu = Menu.selectById(2)
      const menuCount = Menu.getMenuCount();
      expect(selectMenu).toBeDefined();
      expect(selectMenu.id).toEqual(2);
      expect(menuCount).toEqual(3);
    })

    test('select menu by id 1', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const selectMenu = Menu.selectById(1)
      const menuCount = Menu.getMenuCount();
      expect(selectMenu).toBeDefined();
      expect(selectMenu.id).toEqual(1);
      expect(menuCount).toEqual(3);
    })

    test('select menu by id 3', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const selectMenu = Menu.selectById(3)
      const menuCount = Menu.getMenuCount();
      expect(selectMenu).toBeDefined();
      expect(selectMenu.id).toEqual(3);
      expect(menuCount).toEqual(3);
    })

    test('select menu by out of id', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);
      const selectMenu = Menu.selectById(4)
      const menuCount = Menu.getMenuCount();
      expect(selectMenu).toBeNull();
      expect(menuCount).toEqual(3);
    })
})

// Update Menu
describe('Update Menu', () => {
    test('update menu name', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      const updateMenu = Menu.updateById(1, "ผัดกระเพรา", null, null)
      const menuCount = Menu.getMenuCount();
      expect(updateMenu).toBeDefined();

      expect(updateMenu.id).toEqual(1);
      expect(updateMenu.name).toEqual("ผัดกระเพรา");
      expect(updateMenu.category).toEqual(1);
      expect(updateMenu.price).toEqual(50);

      expect(menuCount).toEqual(2);
    })  

    test('update menu category', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      const updateMenu = Menu.updateById(1, null, 2, null)
      const menuCount = Menu.getMenuCount();
      expect(updateMenu).toBeDefined();

      expect(updateMenu.id).toEqual(1);
      expect(updateMenu.name).toEqual("ผัดกระเพรา1");
      expect(updateMenu.category).toEqual(2);
      expect(updateMenu.price).toEqual(50);

      expect(menuCount).toEqual(2);
    })  

    test('update menu price', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      const updateMenu = Menu.updateById(1, null, null, 60)
      const menuCount = Menu.getMenuCount();
      expect(updateMenu).toBeDefined();

      expect(updateMenu.id).toEqual(1);
      expect(updateMenu.name).toEqual("ผัดกระเพรา1");
      expect(updateMenu.category).toEqual(1);
      expect(updateMenu.price).toEqual(60);

      expect(menuCount).toEqual(2);
    })

    test('update menu name, category, price', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      const updateMenu = Menu.updateById(1, "ผัดกระเพรา", 2, 60)
      const menuCount = Menu.getMenuCount();
      expect(updateMenu).toBeDefined();

      expect(updateMenu.id).toEqual(1);
      expect(updateMenu.name).toEqual("ผัดกระเพรา");
      expect(updateMenu.category).toEqual(2);
      expect(updateMenu.price).toEqual(60);

      expect(menuCount).toEqual(2);
    })

    test('update menu name, category, price', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      const updateMenu = Menu.updateById(3, "ผัดกระเพรา", 2, 60)
      const menuCount = Menu.getMenuCount();
      expect(updateMenu).toBeNull();
      expect(menuCount).toEqual(2);
    })
})

// Show Menu
describe('Show Menu', () => {
    test('default menu show', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา", 1, 50);
      Menu.create("ผัดกระเพรา", 2, 50);
      const menu = Menu.showAll();
      const menuCount = Menu.getMenuCount();
      expect(menu[0].id).toEqual(1);
      expect(menu[0].category["name"]).toEqual("โปรโมชั่นวันนี้");
      expect(menu[1].id).toEqual(2);
      expect(menu[1].category["name"]).toEqual("เมนูแนะนำ");
      expect(menuCount).toEqual(2);
    })
})