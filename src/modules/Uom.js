const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
const uom = sequelize.define('uom',{
    shippingTermsId:{
        type: DataTypes.INTEGER,
        defaultValue: false,
    },
    paymentTermsId:{
        type: DataTypes.INTEGER,
        defaultValue: false,
    },
    categoryName:{
        type: DataTypes.INTEGER,
        defaultValue: false,
    },
    subCategoryName:{
        type: DataTypes.INTEGER,
        defaultValue: false,
    },
    uomDescription:{
        type: DataTypes.STRING,
      allowNull: false,
    },
    uomCode:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

return uom

}