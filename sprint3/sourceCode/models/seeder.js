const Menu = require('../models/menu');
const CategoryMenu = require('../models/categoryMenu');

const seedData = () => {
    Menu.clearAll();

    // category create
    CategoryMenu.create("เมนูราดข้าว");
    CategoryMenu.create("เมนูเส้น");
    CategoryMenu.create("เมนูไข่");
    CategoryMenu.create("เมนูต้ม");
    CategoryMenu.create("เมนูกับข้าว");
    CategoryMenu.create("เมนูแกง");
    CategoryMenu.create("เมนูยำ");

    // category 1
    Menu.create("ผัดกระเพรา + น้ำอัดลม", 1, 99);
    Menu.create("ผัดกระเพรา + ไข่ดาว", 1, 50);
    Menu.create("ผัดกระเพรา + ไข่เจียวหมูสับ", 1, 55);

    // category 2
    Menu.create("เมนูแนะนำ", 2, 50);
    Menu.create("เมนูแนะนำ", 2, 50);
    Menu.create("เมนูแนะนำ", 2, 55);
    Menu.create("เมนูแนะนำ", 2, 60);

    // 3. เมนูราดข้าว (Category 3)
    Menu.create("ข้าวกะเพราหมูสับ", 3, 50);
    Menu.create("ข้าวกะเพราหมูกรอบ", 3, 60);
    Menu.create("ข้าวหมูกระเทียม", 3, 50);
    Menu.create("ข้าวผัดปู", 3, 60);
    Menu.create("ข้าวไข่เจียวหมูสับ", 3, 45);
    Menu.create("ข้าวหมูทอดน้ำปลา", 3, 55);

    // 4. เมนูเส้น (Category 4)
    Menu.create("ผัดซีอิ๊วหมู", 4, 50);
    Menu.create("ผัดไทยกุ้งสด", 4, 65);
    Menu.create("ราดหน้าหมูกรอบ", 4, 60);
    Menu.create("สุกี้น้ำหมู", 4, 50);
    Menu.create("ก๋วยเตี๋ยวคั่วไก่", 4, 50);

    // 5. เมนูไข่ (Category 5)
    Menu.create("ไข่เจียวกรอบ", 5, 40);
    Menu.create("ไข่ดาว", 5, 10);
    Menu.create("ไข่ตุ๋น", 5, 50);
    Menu.create("ไข่ลูกเขย", 5, 50);

    // 6. เมนูต้ม (Category 6)
    Menu.create("ต้มจืดเต้าหู้หมูสับ", 6, 80);
    Menu.create("ต้มยำกุ้ง", 6, 120);
    Menu.create("ต้มแซ่บกระดูกอ่อน", 6, 100);
    Menu.create("แกงจืดตำลึง", 6, 70);

    // 7. เมนูกับข้าว (Category 7)
    Menu.create("ปูผัดผงกะหรี่", 7, 150);
    Menu.create("คะน้าผัดน้ำมันหอย", 7, 70);
    Menu.create("หมูกรอบผัดพริกเกลือ", 7, 120);
    Menu.create("กุ้งผัดสะตอ", 7, 150);

    // 8. เมนูแกง (Category 8)
    Menu.create("แกงเขียวหวานไก่", 8, 90);
    Menu.create("แกงส้มชะอมไข่กุ้ง", 8, 120);
    Menu.create("พะแนงหมู", 8, 90);
    Menu.create("มัสมั่นเนื้อ", 8, 150);

    // 9. เมนูยำ (Category 9)
    Menu.create("ยำวุ้นเส้นหมูสับ", 9, 80);
    Menu.create("ยำมาม่าหมูสับ", 9, 80);
    Menu.create("ยำรวมมิตร", 9, 120);
};

module.exports = seedData;