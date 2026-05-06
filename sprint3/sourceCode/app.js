require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const seedData = require('./models/seeder');
const customerRoutes = require('./routes/customer');
const backOfficeRoutes = require('./routes/backOffice');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const session = require('express-session');

// วางไว้ก่อน app.use('/', routes);
app.use(session({
  secret: 'my_super_secret_key', // เปลี่ยนเป็นข้อความสุ่มยาวๆ
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // ถ้าเป็น http ปกติให้เป็น false (ถ้า https ให้เป็น true)
    maxAge: 24 * 60 * 60 * 1000 // หมดอายุใน 1 วัน (หน่วยเป็นมิลลิวินาที)
  }
}));

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Admin = require('./models/admin'); // พาธไปที่ Model ของคุณ

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    
    // ตรวจสอบว่า Gmail อยู่ในรายชื่อที่กำหนดไหม
    if (Admin.verifyGoogleUser(email)) {
      return done(null, profile);
    } else {
      // ถ้าไม่อยู่ใน list ให้ส่ง error กลับไป
      return done(null, false, { message: 'คุณไม่ใช่เจ้าของร้าน' });
    }
  }
));

// สำหรับ Session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', backOfficeRoutes);
app.use('/customer', customerRoutes);

const PORT = process.env.PORT || 3000; 

seedData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});