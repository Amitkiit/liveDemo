const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize('conqtvms_dev','candidate','NoTeDeSt^C10.6?SxwY882}',{

host : "https://db-technical-test.conqt.com",
dialect : 'mysql',
logging : false,
pool : {max:5,min:0,idle:10000}
})


sequelize.authenticate()
.then(()=> {
console.log("DataBase connected successfully");
})
.catch( err => {
console.log(err);
})

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./Product')(sequelize,DataTypes);
db.vendor = require('./Vendor')(sequelize,DataTypes)
db.uom=require('./Uom')(sequelize,DataTypes)

db.users.hasMany(db.uom,{
    foreignKey:'category_Id',
    as:"uom"
})

db.tasks.belongsTo(db.products, {
     foreignKey: 'category_Id',
     as:"products"
})

db.users.hasMany(db.uom,{
    foreignKey:'subcategory_Id',
    as:"uom"
})

db.tasks.belongsTo(db.products, {
     foreignKey: 'subcategory_Id',
     as:"products"
})
//db.questions = require('./question')(sequelize,DataTypes) 

//===============relation between user and otpHistory=======================//



db.sequelize.sync({force:false})
.then(()=> {
console.log("yes re sync");
})

module.exports = db;