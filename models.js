const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("ngonfresh", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

// Định nghĩa mô hình cho bảng khachhang
const KhachHang = sequelize.define(
  "khachhang",
  {
    MaUser: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    TenKhachHang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SoDT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "khachhang",
    timestamps: false,
  }
);

// Định nghĩa mô hình cho bảng danhmucsanpham
const DanhMucSanPham = sequelize.define(
  "danhmucsanpham",
  {
    MaDMSP: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    TenDanhMuc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "danhmucsanpham",
    timestamps: false,
  }
);

// Định nghĩa mô hình cho bảng kho
const Kho = sequelize.define(
  "kho",
  {
    MaSP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    SoLuongTonKho: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "kho",
    timestamps: false,
  }
);

// Định nghĩa mô hình cho bảng sanpham
const SanPham = sequelize.define(
  "sanpham",
  {
    MaSP: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    MaDMSP: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TenSP: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Gia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NgaySanXuat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HanSuDung: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HinhAnh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "sanpham",
    timestamps: false,
  }
);

// Định nghĩa mô hình cho bảng chitietdonhang
const ChiTietDonHang = sequelize.define(
  "chitietdonhang",
  {
    MaDH: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    MaUser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MaSP: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DiaChiThanhToan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ThanhTien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "chitietdonhang",
    timestamps: false,
  }
);

// Liên kết giữa các bảng
KhachHang.hasMany(ChiTietDonHang, { foreignKey: "MaUser" });
ChiTietDonHang.belongsTo(KhachHang, { foreignKey: "MaUser" });

SanPham.hasMany(ChiTietDonHang, { foreignKey: "MaSP" });
ChiTietDonHang.belongsTo(SanPham, { foreignKey: "MaSP" });

DanhMucSanPham.hasMany(SanPham, { foreignKey: "MaDMSP" });
SanPham.belongsTo(DanhMucSanPham, { foreignKey: "MaDMSP" });

// Export các mô hình để sử dụng trong backend.js
module.exports = {
  KhachHang,
  DanhMucSanPham,
  Kho,
  SanPham,
  ChiTietDonHang,
};
