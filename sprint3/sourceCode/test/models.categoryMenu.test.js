const CategoryMenu = require('../models/categoryMenu');
const Menu = require('../models/menu');

// Count Method
describe('Count CategoryMenu', () => {
    test('default categoryMenu count', () => {
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 2");
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(categoryMenuCount).toEqual(4);
    })

    test('clear categoryMenu and count', () => {
      CategoryMenu.clearAll();
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(categoryMenuCount).toEqual(2);
    })

    test('categoryMenu count when duplicate categoryName', () => {
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 1");
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(categoryMenuCount).toEqual(3);
    })
})

// Remove CategoryMenu
describe('Remove CategoryMenu', () => {
    test('remove categoryMenu by id 3', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 2");
      const deleteCategoryMenu = CategoryMenu.deleteById(3)
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(deleteCategoryMenu).toBeDefined();
      expect(deleteCategoryMenu.id).toEqual(3);
      expect(categoryMenuCount).toEqual(3);
    })

    test('remove categoryMenu by id 1 is canEdit = False', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 2");
      const deleteCategoryMenu = CategoryMenu.deleteById(1)
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(deleteCategoryMenu).toBeNull();
      expect(categoryMenuCount).toEqual(4);
    })

    test('remove categoryMenu out of id', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 2");
      const deleteCategoryMenu = CategoryMenu.deleteById(5)
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(deleteCategoryMenu).toBeNull();
      expect(categoryMenuCount).toEqual(4);
    })

    test('remove categoryMenu when have menu', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 2");
      Menu.create("ผัดกระเพรา", 3, 50);
      const deleteCategoryMenu = CategoryMenu.deleteById(3)
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(deleteCategoryMenu).toBeNull();
      expect(categoryMenuCount).toEqual(4);
    })
})

// Update CategoryMenu
describe('Update CategoryMenu', () => {
    test('update categoryMenu', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      CategoryMenu.create("ประเภท 2");
      const updateCategoryMenu = CategoryMenu.updateById(3, "ประเภทจานเดียว")
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(updateCategoryMenu).toBeDefined();

      expect(updateCategoryMenu.id).toEqual(3);
      expect(updateCategoryMenu.name).toEqual("ประเภทจานเดียว");

      expect(categoryMenuCount).toEqual(4);
    })

    test('update categoryMenu is canEdit = False', () => {
      CategoryMenu.clearAll();
      const updateCategoryMenu = CategoryMenu.updateById(1, "โปรโมชั่นพรุ่งนี้")
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(updateCategoryMenu).toBeNull();
      expect(categoryMenuCount).toEqual(2);
    })

    test('update categoryMenu when change duplicate name', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      const updateCategoryMenu = CategoryMenu.updateById(3, "โปรโมชั่นวันนี้")
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(updateCategoryMenu).toBeNull();
      expect(categoryMenuCount).toEqual(3);
    })

    test('update categoryMenu out of id', () => {
      CategoryMenu.clearAll();
      CategoryMenu.create("ประเภท 1");
      const updateCategoryMenu = CategoryMenu.updateById(4, "เมนูต้ม")
      const categoryMenuCount = CategoryMenu.getCategoryMenuCount();
      expect(updateCategoryMenu).toBeNull();
      expect(categoryMenuCount).toEqual(3);
    })
})