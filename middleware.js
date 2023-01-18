// const { use } = require("passport");
const Product = require("./models/Product");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to login first");
    return res.redirect("/login");
  }
  next();
};

module.exports.isRetailer = (req, res, next) => {
  if (req.user.userType === "retailer") {
    return next();
  }
  req.flash("error", "You are not authorized to to that");
  res.redirect("/products");
};

module.exports.isProductAuthor = async (req, res, next) => {
  const { productid } = req.params;
  const product = await Product.findById(productid);
  if (product.author && product.author.equals(req.user._id)) {
    return next();
  }
  req.flash("error", "You are not authorized to do that");
  res.redirect("/products");
};
