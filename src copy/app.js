const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')

// const expressHbs = require('express-handlebars');
const errorController = require("./controllers/error");
// const db=require('./util/database')
// const mongooseConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://anshulprogrammingjobs:JEED13YCYEiCifdR@cluster0.uixj5ca.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection=csrf();

// app.engine(
//   'hbs',
//   expressHbs.engine({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );
app.set("view engine", "ejs");
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

//SEQUELIZE CODE
// const sequelize = require('./util/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');
//SEQUELIZE CODE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req,res,next)=>{
  if (!req.session.user) {
   return next();
  }
  
  User.findById(req.session.user._id).then(user=>{
    req.user=user;
     next();
    })
    .catch(err=>console.log(err))
});

//SEQUELIZE CODE
// app.use((req,res,next)=>{
//    User.findByPk(1).then((user)=>{
//     req.user=user;
//     next();
//    }).catch((err)=>{
//     console.log(err)
//    })
// });
//SEQUELIZE CODE

//MongoDb Code
app.use((req, res, next) => {
  User.findById("643f982e23163baff1faa639")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.use((req, res, next) => {

// });

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;
  res.locals.csrfToken=req.csrfToken();
  next();
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404Page);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("app listening & connected");
  })
  .catch((err) => console.log(err));

// Database.connect("username", "password", "dbname");

//SEQUELIZE CODE

// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User)
// Cart.belongsToMany(Product,{through:CartItem})
// Product.belongsToMany(Cart,{through:CartItem})
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product,{through:OrderItem});

// // sequelize.sync({force:true}) // to overwrite the table
// sequelize.sync()
// .then((result)=>{
//   return  User.findByPk(1);
// }).then((user)=>{
//     if (!user) {
//     return User.create({name:"Anshul",email:"anshul@gmail.com"});
//     }
//     return user;
//   }).then((user)=>{
//    return user.createCart();
//   }).then(()=>{
//    app.listen(3000);
//   }).catch((err)=>{
//     console.log(err)
// })

//SEQUELIZE CODE
