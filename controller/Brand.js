const { Brand } = require("../Model/Brand");

exports.fetchBrands = async(req, res)=>{
    try {
        const brand = await Brand.find({}).exec();
        res.status(200).json(brand)
    } catch (error) {
        res.status(404).json({error: error})
    }
}

exports.createBrand = async(req, res)=>{
    const brand = new Brand(req.body);
    try {
        const doc = await brand.save();
        res.status(201).json({doc})
    } catch (error) {
        res.status(404).json({error: error})
    }
}