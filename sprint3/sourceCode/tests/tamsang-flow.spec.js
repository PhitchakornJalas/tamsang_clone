const { test, expect } = require('@playwright/test');

test.describe('TamSang User Flow & Logic Tests', () => {

  // เคสที่ 1: ตรวจสอบข้อมูลในตะกร้าไม่หายเมื่อปิด Browser
  test('1. Cart items should persist after reopening the browser', async ({ browser }) => {
    // สร้าง Browser Context ใหม่
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/customer'); // URL ของแอปคุณ

    // จำลองการกดเพิ่มอาหารใส่ตะกร้า (ปรับ Selector เช่น .add-to-cart หรือ .Menu-Card)
    await page.click('.Menu-Card'); 

    await page.click('.add-to-cart-btn'); 
    await page.click('.Back-btn'); 

    // ตรวจสอบว่า Bottom Bar ขึ้นแล้ว
    await expect(page.locator('.Cart-BottomBar')).toBeVisible();

    // ปิด Context (เหมือนปิด Browser)
    await context.close();

    // เปิด Context ใหม่
    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    await newPage.goto('http://localhost:3000/customer');

    // ข้อมูลต้องยังอยู่ (ตรวจสอบว่า Bottom Bar ยังขึ้นอยู่)
    await expect(newPage.locator('.Cart-BottomBar')).toBeVisible();
    await newContext.close();
  });

  // เคสที่ 2: ทดสอบการ Scroll ไปยังหมวดหมู่
  test('2. Should scroll to category when clicked', async ({ page }) => {
    await page.goto('http://localhost:3000/customer');
    // สมมติว่ากดหมวดหมู่ที่ 2
    const categoryBtn = page.locator('.Categories span').nth(1); 
    await categoryBtn.click();
    
    // ตรวจสอบว่า section หัวข้อนั้นโผล่ขึ้นมาบนจอจริงๆ
    const targetSection = page.locator('section').nth(1);
    await expect(targetSection).toBeInViewport();
  });

  // เคสที่ 3: เช็ค Sidebar Admin (ต้องผ่านด่านรหัสผ่านก่อน)
  test('3. Admin sidebar should be visible after login', async ({ page }) => {
    // 1. ไปหน้า Login Admin
    await page.goto('http://localhost:3000'); // ปรับ URL ตามหน้า login ของคุณ

    // 2. กรอก Username และ Password (ปรับ Selector ตาม name หรือ id ใน input ของคุณ)
    await page.fill('input[name="username"]', 'admin'); // ใส่ username จริงของคุณ
    await page.fill('input[name="password"]', 'Tamsang123'); // ใส่รหัสผ่านจริงของคุณ
    
    // 3. กดปุ่ม Login
    await page.click('button[type="submit"]');

    // 4. ตรวจสอบว่าเข้าไปหน้า Dashboard และเห็น Sidebar ไหม
    await expect(page).toHaveURL(/.*dashboard/);
    await page.click('.menu-btn'); 
    const sidebar = page.locator('.sidebar'); // ปรับ Selector ตามจริง
    await expect(sidebar).toBeVisible();
  });

  // เคสที่ 4: ป้องกันคนไม่ได้ Login เข้าหลังบ้าน
  test('4. Should redirect unauthorized user to login page', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    // ต้องถูกเด้งกลับมาที่หน้าแรก (Login)
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  // เคสที่ 5: สั่งอาหาร -> ชำระเงิน -> เช็ค History (ฝั่งลูกค้า)
  test('5. Order should appear in History after checkout', async ({ page }) => {
    await page.goto('http://localhost:3000/customer');

    // 1. กดเลือกอาหาร (เลือกอันแรกที่เจอ)
    const menuCard = page.locator('.Menu-Card').first();
    await menuCard.click();

    await page.click('.add-to-cart-btn');

    await page.click('.Submit-Order-btn');
    await page.click('.confirm-btn');
    
    // 3. กดปุ่มยืนยันการสั่งซื้อ/ชำระเงิน
    // ใช้คำสั่งหาปุ่มที่มีคำว่า "ชำระเงิน" หรือ "ยืนยัน"
    const checkoutBtn = page.getByRole('button', { name: /ชำระเงิน/ });
    await checkoutBtn.click();

    const PaymentBtn = page.getByRole('button', { name: /💵 ชำระด้วยเงินสด/ });
    await PaymentBtn.click();

    await page.waitForNavigation({ waitUntil: 'networkidle' });

    await page.goto('http://localhost:3000'); // ปรับ URL ตามหน้า login ของคุณ
    await page.fill('input[name="username"]', 'admin'); // ใส่ username จริงของคุณ
    await page.fill('input[name="password"]', 'Tamsang123'); // ใส่รหัสผ่านจริงของคุณ
    await page.click('button[type="submit"]');
    // 4. ระบบควรพาไปหน้าประวัติการสั่งซื้อ
    await page.goto('http://localhost:3000/orderHistory');
    await expect(page).toHaveURL(/.*orderHistory/);

    const firstOrder = page.locator('.order-card, .order-item').first();
    await expect(firstOrder).toBeVisible();
  });
});