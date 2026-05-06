const Admin = require('../models/admin');

module.exports = {
  getOrderHistory: (req, res) => {
    const Order = require('../models/order');
    const orderHistory = Order.getOrderHistory();

    res.render('backOffice/orderHistory', { orderHistory });
  },
  getLoginPage: (req, res) => {
    res.render('backOffice/login');
  },
  login: async (req, res) => {
    // เช็คก่อนว่าจริงๆ แล้วเขา login ค้างไว้หรือเปล่า
    if (req.session.isAdmin) {
      return res.redirect('/dashboard');
    }

    const { username, password } = req.body;
    const user = await Admin.login(username, password);

    if (user) {
      req.session.isAdmin = true;
      req.session.username = user.username;
      return res.redirect('/dashboard');
    } else {
      return res.send("<script>alert('ชื่อผู้ใช้หรือรหัสผ่านผิด'); window.location.href='/';</script>");
    }
  },
  logout: (req, res, next) => {
    // 1. สั่งให้ Passport ลบข้อมูลการ Login (Google)
    req.logout((err) => {
      if (err) { return next(err); }

      // 2. ทำลาย Session ทั้งหมดในฝั่ง Server
      req.session.destroy((err) => {
        if (err) {
          // console.log("Session destroy error:", err);
        }
        // 3. ล้าง Cookie ในฝั่ง Browser (เพื่อความชัวร์)
        res.clearCookie('connect.sid');

        // 4. ส่งกลับไปหน้า Login
        res.redirect('/');
      });
    });
  },
  googleCallback: (req, res) => {
    // ถ้าผ่านมาถึงตรงนี้ได้ แปลว่า Passport ตรวจสอบ Gmail แล้วว่าอยู่ใน Whitelist
    const user = req.user;

    req.session.isAdmin = true;
    req.session.username = user.displayName;
    req.session.email = user.emails[0].value;

    res.redirect('/dashboard');
  },
  getDashboard: (req, res) => {
    res.render('backOffice/dashboard');
  }
}