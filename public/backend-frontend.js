// Đăng nhập
$('#loginForm').submit(async function(event) {
    event.preventDefault();

    const username = $('#TenKhachHang').val();
    const password = $('#Password').val();

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        // Lưu token vào localStorage hoặc sessionStorage để sử dụng sau này
        localStorage.setItem('token', data.token);

        console.log('Đăng nhập thành công. Token:', data.token);
    } catch (error) {
        console.error('Đăng nhập thất bại:', error.message);
    }
});

// Sau khi đăng nhập thành công, gửi yêu cầu API để lấy thông tin người dùng
async function getUserInfo() {
    fetch('http://localhost:5000/api/user')
  .then(response => response.json())
  .then(data => {
    $('#userInfo').text(`Chào mừng, ${data.username}!`);
  })
  .catch(error => {
    console.log('Lỗi:', error);
  });

    
}


// Gọi hàm getUserInfo() sau khi đăng nhập thành công
// Đảm bảo rằng hàm này được gọi sau khi token đã được lưu vào localStorage
getUserInfo();

// Đăng ký
$('#registerForm').submit(async function(event) {
    event.preventDefault();

    const username = $('#TenKhachHang').val();
    const phoneNumber = $('#SoDT').val();
    const email = $('#Email').val();
    const password = $('#password').val();

    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, phoneNumber, email, password })
        });
        const data = await response.json();
        console.log('Đăng ký thành công:', data.message);

        // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập hoặc thực hiện hành động khác
    } catch (error) {
        console.error('Đăng ký thất bại:', error.message);
    }
});
