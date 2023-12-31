const express = require('express')
const { fetchBrands, createBrand } = require('../controller/Brand');
const { isOwner } = require('../Services/Comman');

const router = express.Router()

router.get('/', fetchBrands).post('/',isOwner(), createBrand);
module.exports = router;