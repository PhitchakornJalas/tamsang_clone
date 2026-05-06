const express = require('express');
const router = express.Router();
const passport = require('passport');

const backOfficeController = require('../controllers/backOfficeController');

const checkLogin = (req, res, next) => {
  // เช็คว่ามี isAdmin ใน session ไหม หรือมี req.user จาก passport ไหม
  if ((req.session && req.session.isAdmin) || req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
// Middleware สำหรับหน้า Login: ถ้า Login แล้ว ห้ามเข้าหน้า Login อีก ให้ดีดไป Dashboard
const isLogin = (req, res, next) => {
  if ((req.session && req.session.isAdmin) || req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
};

router.use((req, res, next) => {
  // เช็คชื่อจาก Session ปกติ หรือจาก Google Passport
  const username = req.session.username || (req.user ? req.user.displayName : null);

  // เก็บไว้ใน res.locals ตัวแปรนี้จะหลุดไปอยู่ใน EJS ทุกหน้าโดยอัตโนมัติ
  res.locals.currentUser = username || 'Guest';
  next();
});

router.get('/', isLogin, backOfficeController.getLoginPage);
router.post('/', backOfficeController.login);
// กดปุ่มนี้เพื่อไปหน้า Login Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// จุดที่ Google ส่งข้อมูลกลับมา
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failure' }),
  backOfficeController.googleCallback
);
// หน้าแจ้งเตือนเมื่อไม่ใช่เจ้าของร้าน
router.get('/login-failure', (req, res) => {
  res.send("<script>alert('คุณไม่ใช่เจ้าของร้าน'); window.location.href='/';</script>");
});
router.get('/dashboard', checkLogin, backOfficeController.getDashboard);
router.get('/orderHistory', checkLogin, backOfficeController.getOrderHistory);
router.get('/logOut', backOfficeController.logout);

module.exports = router;