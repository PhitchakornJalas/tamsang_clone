const Admin = require('../models/admin');

describe('Admin Model - Login System', () => {
  
  test('Should return user object when login with correct credentials', async () => {
    const result = await Admin.login("admin", "Tamsang123");
    // เช็คว่าไม่ใช่ null
    expect(result).not.toBeNull();
    // เช็คว่ามี property username และค่าต้องถูกต้อง
    expect(result).toHaveProperty('username', 'admin');
  });

  test('Should return null when password is incorrect', async () => {
    const result = await Admin.login("admin", "wrongpassword");
    expect(result).toBeNull();
  });

  test('Should return null when username does not exist', async () => {
    const result = await Admin.login("notadmin", "Tamsang123");
    expect(result).toBeNull();
  });
});

// จำลอง Middleware logic
const checkLogin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
};

describe('Auth Middleware - checkLogin', () => {
  let req, res, next;

  beforeEach(() => {
    req = { session: {} };
    res = { redirect: jest.fn() }; // ใช้ mock function เพื่อดูว่ามีการโดนสั่งเด้งไหม
    next = jest.fn();
  });

  test('Should call next() if user is logged in as admin', () => {
    req.session.isAdmin = true;
    checkLogin(req, res, next);
    expect(next).toHaveBeenCalled(); // ต้องผ่านด่านไปได้
  });

  test('Should redirect to / if user is not logged in', () => {
    req.session.isAdmin = false;
    checkLogin(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/'); // ต้องโดนเด้งกลับ
    expect(next).not.toHaveBeenCalled(); // ห้ามไปต่อ
  });
});

describe('Google Auth Whitelist with ENV', () => {
  const originalEnv = process.env.ALLOWED_ADMINS;

  beforeEach(() => {
    // เคลียร์ค่า env ก่อนเริ่มแต่ละเทส
    jest.resetModules(); 
  });

  afterAll(() => {
    process.env.ALLOWED_ADMINS = originalEnv;
  });

  test('Should return true for email in ENV list', () => {
    process.env.ALLOWED_ADMINS = "test1@gmail.com,test2@gmail.com";
    
    // เรียกผ่าน Admin.verifyGoogleUser แทน
    const result = Admin.verifyGoogleUser("test1@gmail.com"); 
    expect(result).toBe(true);
  });

  test('Should return false for email NOT in ENV list', () => {
    process.env.ALLOWED_ADMINS = "test1@gmail.com,test2@gmail.com";
    
    const result = Admin.verifyGoogleUser("hacker@gmail.com");
    expect(result).toBe(false);
  });

  test('Should return true even if email has spaces or uppercase in ENV', () => {
    process.env.ALLOWED_ADMINS = " Owner@gmail.com , admin@Tamsang.com ";
    
    const result = Admin.verifyGoogleUser("owner@gmail.com");
    expect(result).toBe(true);
  });
});