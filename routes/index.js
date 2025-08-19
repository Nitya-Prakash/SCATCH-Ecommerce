const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Product Added To Cart Successfully");
  res.redirect("/shop");
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  let bills = [];

  user.cart.forEach((prod) => {
    const bill =
      Number(prod.price + 20) - Number((prod.discount / 100) * prod.price);
    bills.push(bill);
  });

  res.render("cart", { products: user.cart, bills });
});

module.exports = router;
