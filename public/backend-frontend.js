//đăng nhập
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('TenKhachHang').value;
    const password = document.getElementById('Password').value;

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
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        document.getElementById('userInfo').innerText = `Welcome, ${data.username}!`;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error.message);
    }
}

// Gọi hàm getUserInfo() sau khi đăng nhập thành công
// Đảm bảo rằng hàm này được gọi sau khi token đã được lưu vào localStorage
getUserInfo();

//Đăng ký
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('TenKhachHang').value;
    const phoneNumber = document.getElementById('SoDT').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username,phoneNumber, email, password })
        });
        const data = await response.json();
        console.log('Đăng ký thành công:', data.message);

        // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập hoặc thực hiện hành động khác
    } catch (error) {
        console.error('Đăng ký thất bại:', error.message);
    }
});

