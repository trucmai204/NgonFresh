// Import thư viện mysql2
const mysql = require('mysql2');

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
