const bcrypt = require('bcryptjs');

const initialPassword = "Tamsang123";
const salt = bcrypt.genSaltSync(10);
const hashed = bcrypt.hashSync(initialPassword, salt);

let adminAccount = {
  username: "admin",
  passwordHash: hashed
};

module.exports = {
  login: async (username, password) => {
    if (username !== adminAccount.username) return null; // คืนค่า null ถ้าหาไม่เจอ

    const isMatch = await bcrypt.compare(password, adminAccount.passwordHash);

    if (isMatch) {
      // คืนค่าข้อมูลที่จำเป็นออกไป (ไม่ควรส่ง passwordHash ไปด้วย)
      return { username: adminAccount.username };
    }

    return null;
  },
  verifyGoogleUser: (email) => {
    // ดึงค่าและจัดการ String ภายในฟังก์ชันเลย
    const adminsEnv = process.env.ALLOWED_ADMINS || "";
    const allowedAdmins = adminsEnv.split(',').map(e => e.trim().toLowerCase());
    
    return allowedAdmins.includes(email.toLowerCase());
  }
};