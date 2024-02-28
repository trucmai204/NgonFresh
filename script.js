const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 5000;

// http logger
app.use(morgan('combined'));

app.use(express.static('public'));

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

// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  loggedInUser = username;
  if (!username || !password) {
    return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu bị trống' });
  }

  connection.query('SELECT * FROM khachhang WHERE TenKH = ? AND MK = ?', [username, password], (err, results) => {
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
// Endpoint để lấy thông tin người dùng
app.get('/user', authenticate, (req, res) => {
  // Trả về thông tin người dùng từ phiên làm việc
  res.json(req.session.user);
});

// Đăng ký người dùng
app.post('/register', async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const sql = "INSERT INTO khachhang (TenKH, Email, MK) VALUES (?, ?, ?)";
  const values = [fullName, email, password];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Lỗi khi chèn dữ liệu vào cơ sở dữ liệu:", err);
      res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
      return;
    }
    console.log("Chèn bản ghi mới vào bảng khachhang");
    res.redirect('/login');
  });
});




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});