const express = require('express');
const { fetchCategories, createCategory } = require('../controller/Category');
const { isAuth, isOwner } = require('../Services/Comman');
const router = express.Router()

router.get('/', fetchCategories).post('/',isOwner(), createCategory);

module.exports = router