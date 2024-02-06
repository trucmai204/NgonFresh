const path = require('path')
const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql2');
const app = express()
const port = 5000


// http logger
app.use(morgan('combined'))

app.use(express.static('public'));

// Tạo kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'localhost',       // Địa chỉ máy chủ MySQL
  user: 'root',            // Tên người dùng MySQL
  password: '123456' , // Mật khẩu người dùng MySQL
  database: 'ngonfresh'  // Tên cơ sở dữ liệu MySQL
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối: ' + err.stack);
    return;
  }

  console.log('Đã kết nối thành công đến MySQL');
});

// Đóng kết nối sau khi sử dụng
connection.end((err) => {
  if (err) {
    console.error('Lỗi đóng kết nối: ' + err.stack);
    return;
  }

  console.log('Đã đóng kết nối MySQL');
});


app.get('/', (req, res) => { //=>: around function; / định nghĩa tuyến đường
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// login
// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
// Middleware để xử lý yêu cầu POST từ form đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Thực hiện truy vấn để kiểm tra đăng nhập
  connection.query('SELECT * FROM khachhang WHERE username = TenĐN  AND password = MK', [username, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }

    if (results.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
