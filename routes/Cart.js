const express = require("express")
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controller/Cart');
const { isAdmin, isAuth } = require("../Services/Comman");
const router = express.Router()

router.post('/',isAuth(), addToCart)
      .get('/',isAuth(), fetchCartByUser)
      .delete('/:id',isAuth(), deleteFromCart)
      .patch('/:id',isAuth(), updateCart)

module.exports = router