var port = 5000;
const apiEndpoint = "http://localhost:" + port;

// Đăng nhập
$("#loginForm").submit(async function(event) {
    event.preventDefault();
  
    const loginData = {
      email: $("#Email-login").val(),
      password: $("#Password-login").val(),
    };
  
    try {
      const response = await fetch(apiEndpoint + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
  
      // Redirect user to index.html after successful login
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Error during login:", error.message);
      // Display error message to user
      alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.");
    }
  });
  
// Đăng ký
$("#registerForm").submit(async function (event) {
  event.preventDefault();

  const userData = {
    TenKhachHang: $("#TenKhachHang").val(),
    SoDT: $("#SoDT").val(),
    Email: $("#Email").val(),
    Password: $("#Password").val(),
  };

  try {
    const response = await fetch(apiEndpoint + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Registration successful:", data);

    window.location.href = "login.html";
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert("Đăng ký thất bại.");
  }
});
