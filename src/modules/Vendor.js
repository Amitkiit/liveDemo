const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const vendor = sequelize.define("vendor", {
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return vendor;
};