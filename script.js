const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const users = [];
// http logger
app.use(morgan('combined'));

// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tạo kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'localhost',       // Địa chỉ máy chủ MySQL
  user: 'root',            // Tên người dùng MySQL
  password: '123456',      // Mật khẩu người dùng MySQL
  database: 'ngonfresh'    // Tên cơ sở dữ liệu MySQL
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối: ' + err.stack);
    return;
  }

  console.log('Đã kết nối thành công đến MySQL');
});

// Thiết lập session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Middleware để phục vụ các tệp tĩnh
const staticOptions = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  index: false
};
app.use(express.static('public', staticOptions));

// Trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Đăng nhập
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu bị trống' });
  }

  connection.query('SELECT * FROM khachhang WHERE TenKhachHang = ? AND Password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
    if (results.length > 0) {
      // Nếu đăng nhập thành công, chuyển hướng đến trang chủ
      res.redirect('/index.html');
    } else {
      res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không chính xác' });
    }
  });
});
// Tạo endpoint API để lấy thông tin người dùng sau khi đăng nhập
app.post('/api/user', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ user: req.user.username });
});
// API endpoint để đăng ký người dùng
app.post('/api/register', (req, res) => {
  const { username, phoneNumber, email, password } = req.body;

  // Kiểm tra xem đã tồn tại người dùng với email này chưa
  connection.query('SELECT * FROM khachhang WHERE Email = ?', [email], (error, results) => {
    if (error) {
      console.error('Lỗi khi kiểm tra người dùng tồn tại:', error);
      res.status(500).json({ message: 'Lỗi server' });
      return;
    }

    if (results.length > 0) {
      // Người dùng đã tồn tại
      res.status(400).json({ message: 'Người dùng đã tồn tại!' });
    } else {
      // Thêm người dùng mới vào cơ sở dữ liệu
      connection.query('INSERT INTO khachhang (TenKhachHang, SoDT, Email, Password) VALUES (?, ?, ?, ?)', [username, phoneNumber, email, password], (err, results) => {
        if (err) {
          console.error('Lỗi khi thêm người dùng mới:', err);
          res.status(500).json({ message: 'Lỗi server' });
          return;
        }
        res.status(201).json({ message: 'Đăng ký thành công.' });
      });
    }
  });
});
//route 
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Tìm người dùng trong danh sách
  const user = users.find(u => u.username === username);
  if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
