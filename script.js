const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2');
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
// Dữ liệu mới để thêm vào cơ sở dữ liệu
const newData = {
  TenKH: 'TenKH',
  Email: 'Email',
  MK: 'MK',
  // Thêm các trường và giá trị khác tùy thuộc vào cấu trúc bảng của bạn
};

// Câu truy vấn tự động để thêm dữ liệu vào cơ sở dữ liệu
const query = connection.query('INSERT INTO khachhang SET ?', newData, (err, results) => {
  if (err) {
    console.error('Lỗi khi thêm dữ liệu:', err);
    throw err;
  }
  console.log('Dữ liệu đã được thêm thành công vào cơ sở dữ liệu!');
});
// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route để lấy danh sách người dùng
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(results);
  });
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
  next();
});


// Đăng nhập (cần cải tiến để xử lý đăng nhập)
app.post('/login', (req, res) => {
  // Xử lý đăng nhập ở đây
  // Sau khi xử lý đăng nhập thành công, chuyển hướng người dùng đến trang index
  res.redirect('/index.html');
});




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
