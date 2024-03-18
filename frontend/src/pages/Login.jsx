import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng useHistory để điều hướng


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email: email,
        password: password
      });

      // Xử lý dữ liệu trả về nếu cần
      console.log(response.data.message);
      console.log(response.data.user);
    
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userName', response.data.user.name);
      
      // Điều hướng đến trang Home.jsx sau khi đăng nhập thành công
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Email hoặc mật khẩu không đúng.');
      } else {
        setErrorMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="floatingInput">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
