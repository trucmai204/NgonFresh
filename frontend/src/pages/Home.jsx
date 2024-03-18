import { useState, useEffect } from 'react';
import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  const [name, setUserName] = useState('');

  useEffect(() => {
    // Lấy tên người dùng từ localStorage khi component được tải
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  );
}

export default Home;
