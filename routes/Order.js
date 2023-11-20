const express = require("express")
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder } = require('../controller/Order');
const { isAuth } = require("../Services/Comman");
const router = express.Router()
router.post('/',isAuth(), createOrder)
.get('/',isAuth(), fetchOrdersByUser)
.delete('/:id',isAuth(), deleteOrder)
.patch('/:id',isAuth(), updateOrder) 
module.exports = router