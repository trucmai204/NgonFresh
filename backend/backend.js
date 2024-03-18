const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { User, ProductCategory, Product, OrderDetail } = require("./model");

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Đăng nhập
app.post("/api/v1/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { Email: email } });
    if (!user || user.Password !== password) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng." });
    }
    req.session.user = user;
    return res.status(200).json({ message: "Đăng nhập thành công.", user });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đăng nhập người dùng:", error);
    return res
      .status(500)
      .json({
        message:
          "Đã xảy ra lỗi khi đăng nhập người dùng. Vui lòng thử lại sau.",
      });
  }
});

// Đăng ký
app.post("/api/v1/users/register", async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;
    const existingUser = await User.findOne({ where: { Email: email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Email đã được sử dụng. Vui lòng sử dụng email khác.",
      });
    }
    const newUser = await User.create({
      Name: name,
      PhoneNumber: phoneNumber,
      Email: email,
      Password: password,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đăng ký người dùng:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi đăng ký người dùng. Vui lòng thử lại sau.",
    });
  }
});

app.post('/products', async (req, res) => {
  try {
    // Lấy thông tin sản phẩm từ request body
    const { title, price, description, category, image, rating } = req.body;

    // Tạo sản phẩm mới trong cơ sở dữ liệu
    const newProduct = await Product.create({
      title,
      price,
      description,
      category,
      image,
      rating
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo sản phẩm mới' });
  }
});
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm' });
  }
});
app.get('/category/:category', async (req, res) => {
  try {
    const similarProducts = await Product.findAll({
      where: {
        category: req.params.category
      },
      limit: 5 // Giới hạn số lượng sản phẩm tương tự trả về
    });
    res.json(similarProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy các sản phẩm tương tự' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
