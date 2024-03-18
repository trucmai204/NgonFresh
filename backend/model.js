const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ngonngon", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "User",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "User",
    timestamps: false,
  }
);

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ProductCategory",
    timestamps: false,
  }
);

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
{
  tableName: "Product",
  timestamps: false,
}
);

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TotalPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "OrderDetail",
    timestamps: false,
  }
);

// Define relationships
User.hasMany(OrderDetail, { foreignKey: "UserId" });
OrderDetail.belongsTo(User, { foreignKey: "UserId" });



Product.hasMany(OrderDetail, { foreignKey: "ProductId" });
OrderDetail.belongsTo(Product, { foreignKey: "ProductId" });

// Synchronize the models with the database. If any changes were made to the models, it will automatically update the database schema accordingly
sequelize.sync({ force: false }).then(() => {
  console.log("Backend server and the database is synchronized.");
});

module.exports = { User, ProductCategory, Product, OrderDetail, sequelize };
