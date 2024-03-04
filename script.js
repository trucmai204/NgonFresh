const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const {
  KhachHang,
  DanhMucSanPham,
  Kho,
  SanPham,
  ChiTietDonHang,
} = require("./models");

const port = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Đăng nhập
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const khachHang = await KhachHang.findOne({
      attributes: ["TenKhachHang"],
      where: {
        Email: email,
        Password: password,
      },
    });

    if (khachHang) {
      res.json({ TenKhachHang: khachHang.TenKhachHang });
    } else {
      res.status(401).json({ error: "Email hoặc mật khẩu không chính xác." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Đăng ký
app.post("/api/register", async (req, res) => {
  const { TenKhachHang, SoDT, Email, Password } = req.body;

  try {
    // Tạo MaUser ngẫu nhiên, bạn có thể sử dụng logic tạo mã khác tùy ý
    const MaUser = Math.floor(1000 + Math.random() * 9000);
    const newUser = await KhachHang.create({
      MaUser: MaUser,
      TenKhachHang: TenKhachHang,
      SoDT: SoDT,
      Email: Email,
      Password: Password,
    });

    res.json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
