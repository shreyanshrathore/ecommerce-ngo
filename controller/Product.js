const { Product } = require("../Model/Product");

exports.createProduct = async (req, res) => {
  console.log(req.user);
  const product = new Product(req.body);
  product.admin = req.user.id;
  console.log(product);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err); // Change status code to 500 for server errors
  }
};

exports.fetchProductByAdmin = async (req, res) => {
  const id = req.user.id;
  console.log(id);
  try {
    const adminProduct = await Product.find({ admin: id });
    res.status(200).json(adminProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductReq = async (req, res) => {
  try {
    const adminProduct = await Product.find({ approved: false });
    res.status(200).json(adminProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  const u = req.user;
  console.log(u);
  let query = Product.find({approved: true});
  console.log(query)
  let queryCount = Product.find({});
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    queryCount = queryCount.find({ category: req.query.category });
  }

  if (req.query.brand) {
    query.find({ brand: req.query.brand });
    queryCount = queryCount.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query.sort({ [req.query._sort]: req.query._order });
  }
  const totalDocs = await queryCount.count();
  console.log(totalDocs);
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    console.log("Setting X-Total-Count header");
    res.set("X-Total-Count", totalDocs);
    console.log("Setting X-Total-Count header");
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err); // Change status code to 500 for server errors
  }
};

exports.fetchProductById = async (req, res) =>{
  const id = req.params.id;
  try {
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({error: error})
  }
}

exports.updateProduct = async (req, res) =>{
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body , {new:true})
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({error: error})
  }
}

exports.deleteProduct = async (req, res) =>{
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({error: error})
  }
}

exports.approveProduct = async (req, res) =>{
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id, {approved:true} , {new: true})
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({error: error})
  }
}