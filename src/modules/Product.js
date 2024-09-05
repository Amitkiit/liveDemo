const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currencyCode:{
        type: DataTypes.INTEGER,
      allowNull: false,
    },
    saleAmount:{
        type: DataTypes.INTEGER,
      allowNull: false,
    },
    brochureFileName:{
        type: DataTypes.STRING,
      allowNull: false,
    },
    brochureFileURL:{
        type: DataTypes.STRING,
      allowNull: false,
    },
    subCategoryId:{
        type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId:{
        type: DataTypes.STRING,
      allowNull: false,
    },

  });

  return products;
};