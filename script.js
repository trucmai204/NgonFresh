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
app.post('/login', (req, res) => {
  // Xử lý đăng nhập ở đây

  // Sau khi xử lý đăng nhập thành công, chuyển hướng người dùng đến trang index
  res.redirect('/index.html');
});
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Thực hiện truy vấn SQL INSERT để thêm người dùng mới vào cơ sở dữ liệu
  connection.query(
    'INSERT INTO khachhang (TenKH, MK, Email) VALUES (?, ?, ?)',
    [username, password, email],
    (err, results) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ error: 'Error inserting data into database' });
        return;
      }
      console.log('Inserted new record into users table:', results);
      
      // Chuyển hướng người dùng đến trang index sau khi đăng ký thành công
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
