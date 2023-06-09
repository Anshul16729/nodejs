const Product = require("../models/product");
const Order = require("../models/order");

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll()
//     .then(products => {
//       res.render('shop/product-list', {
//         prods: products,
//         pageTitle: 'All Products',
//         path: '/products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    await res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       res.render('shop/product-detail', {
//         product: product,
//         pageTitle: product.title,
//         path: '/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    await res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll()
//     .then(products => {
//       res.render('shop/index', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    await res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

// exports.postCart = async (req, res, next) => {
//   try {
//     const prodId = req.body.productId;
//     const product = await Product.findById(prodId);
//     if (product) {
//       return req.user.addToCart(product);
//        await res.redirect("/cart");
//     }

//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .deleteItemFromCart(prodId)
//     .then((result) => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };
exports.postCartDeleteProduct =async (req, res, next) => {
 try {
  const prodId = req.body.productId;
  await req.user.removeFromCart(prodId)
  res.redirect("/cart");
 } catch (error) {
  
 }
 
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => console.log(err));
};
