-- DO NOT MODIFY THIS SCRIPTS, THIS IS USED TO CREATE TABLES ONLY
DROP DATABASE IF EXISTS NgonFresh;
CREATE DATABASE IF NOT EXISTS NgonFresh;
USE NgonFresh;

CREATE TABLE IF NOT EXISTS User (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS ProductCategory (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName NVARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Product (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProductCategoryId INT NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Price BIGINT NOT NULL,
    Quantity INT NOT NULL,
    ManufactureDate DATE NOT NULL,
    ExpiryDate DATE NOT NULL,
    ImageUrl NVARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (ProductCategoryId) REFERENCES ProductCategory(Id)
);

CREATE TABLE IF NOT EXISTS OrderDetail (
    Id INT PRIMARY KEY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    TotalPrice BIGINT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ProductId) REFERENCES Product(Id)
);

-- Script to generate fake data
INSERT INTO User (Name, PhoneNumber, Email, Password)
VALUES
('Nguyễn Văn A', '0987654321', 'nguyenvana@example.com', '123456789'),
('Trần Thị B', '0123456789', 'tranthib@example.com', '123456789'),
('Lê Văn C', '0909090909', 'levanc@example.com', '123456789'),
('Phạm Thị D', '0123412345', 'phamthid@example.com', '123456789'),
('Hoàng Văn E', '0909090909', 'hoangvane@example.com', '123456789'),
('Nguyễn Thị F', '0987654321', 'nguyenthif@example.com', '123456789'),
('Trần Văn G', '0123456789', 'tranvang@example.com', '123456789'),
('Lê Thị H', '0909090909', 'lethih@example.com', '123456789'),
('Phạm Văn I', '0123412345', 'phamvani@example.com', '123456789'),
('Hoàng Thị K', '0987654321', 'hoangthik@example.com', '123456789'),
('Nguyễn Văn L', '0123456789', 'nguyenvanl@example.com', '123456789'),
('Trần Thị M', '0909090909', 'tranthim@example.com', '123456789'),
('Lê Văn N', '0123412345', 'levann@example.com', '123456789'),
('Phạm Thị P', '0987654321', 'phamthip@example.com', '123456789'),
('Hoàng Văn Q', '0123456789', 'hoangvanq@example.com', '123456789');

INSERT INTO ProductCategory (CategoryName)
VALUES
('Hoa Quả Tươi'),
('Rau Củ Quả'),
('Thực Phẩm Tươi Sống'),
('Đồ Khô'),
('Hải Sản Tươi'),
('Thịt Gà'),
('Thịt Bò'),
('Trái Cây Mùa'),
('Hạt Giống'),
('Thực Phẩm Chế Biến'),
('Thực Phẩm Đóng Gói'),
('Thực Phẩm Sấy Khô'),
('Hoa Quả Đóng Hộp'),
('Thực Phẩm Đóng Hộp'),
('Thực Phẩm Công Nghiệp');

INSERT INTO Product (ProductCategoryId, Name, Price, Quantity, ManufactureDate, ExpiryDate, ImageUrl)
VALUES
(1, 'Xoài Cát Chu', 30000, 100, '2023-01-01', '2024-12-31', 'xoai.jpg'),
(1, 'Dừa Sáp', 20000, 150, '2023-02-01', '2024-12-31', 'dua.jpg'),
(2, 'Cà Rốt', 10000, 200, '2023-03-01', '2025-12-31', 'carrot.jpg'),
(2, 'Cải Thảo', 12000, 150, '2023-04-01', '2025-12-31', 'cabbage.jpg'),
(3, 'Cá Basa', 50000, 80, '2023-05-01', '2024-12-31', 'fish.jpg'),
(3, 'Tôm Sú', 60000, 100, '2023-06-01', '2024-12-31', 'shrimp.jpg'),
(4, 'Rau Má', 30000, 120, '2023-07-01', '2025-12-31', 'herbs.jpg'),
(4, 'Nấm Hương', 40000, 100, '2023-08-01', '2025-12-31', 'mushroom.jpg'),
(5, 'Gà Ta', 120000, 50, '2023-09-01', '2025-12-31', 'chicken.jpg'),
(5, 'Vịt Xiêm', 150000, 60, '2023-10-01', '2025-12-31', 'duck.jpg'),
(6, 'Thăn Lợn', 200000, 80, '2023-11-01', '2025-12-31', 'pork.jpg'),
(6, 'Nạc Dăm Bò', 250000, 100, '2023-12-01', '2025-12-31', 'beef.jpg'),
(7, 'Lê Lâm Đồng', 30000, 200, '2024-01-01', '2025-12-31', 'pear.jpg'),
(7, 'Chuối Tiêu', 25000, 150, '2024-02-01', '2025-12-31', 'banana.jpg'),
(8, 'Hạt Dẻ Cười', 40000, 100, '2024-03-01', '2025-12-31', 'peanut.jpg');