/** @format */

const Product = require("../models/productModel");

const getProductsBySearchFilter = async (req, res) => {
  try {
    const {
      query,
      price,
      category,
      stars,
      subcategory,
      brand,
      color,
      shipping,
      page,
    } = req.body;

    let currentPage = Number(page) || 1;
    const limit = 3;

    //filter category
    let queryProducts = [];
    let priceProducts = [];
    let categoryProducts = [];
    let starProducts = [];
    let subcategoryProducts = [];
    let brandProducts = [];
    let colorProducts = [];
    let shippingProducts = [];

    //result category
    let products = [];
    let finalProducts = [];

    //filter id's
    let queryId = [];
    let priceId = [];
    let categoryId = [];
    let starId = [];
    let subcategoryId = [];
    let brandId = [];
    let colorId = [];
    let shippingId = [];

    if (query !== undefined && query.length > 0) {
      queryProducts = await handleQuery(req, res, query);
    }

    if (
      price !== undefined &&
      (price[0] != Number(0) || price[1] != Number(0))
    ) {
      priceProducts = await handlePrice(req, res, price);
    }

    if (category !== undefined && category.length > 0) {
      categoryProducts = await handleCategory(req, res, category);
    }

    if (stars !== undefined && stars !== 0) {
      starProducts = await handleStar(req, res, stars);
    }

    if (subcategory !== undefined && subcategory.length > 0) {
      subcategoryProducts = await handleSubcategory(req, res, subcategory);
    }

    if (brand !== undefined && brand.length > 0) {
      brandProducts = await handleBrand(req, res, brand);
    }

    if (color !== undefined && color.length > 0) {
      colorProducts = await handleColor(req, res, color);
    }

    if (shipping !== undefined && shipping.length > 0) {
      shippingProducts = await handleShipping(req, res, shipping);
    }
    ///--------------------------------------------------------------------------///

    if (
      (query !== undefined && query.length > 0 && queryProducts.length === 0) ||
      (price !== undefined &&
        (price[0] != Number(0) || price[1] != Number(0)) &&
        priceProducts.length === 0) ||
      (category !== undefined &&
        category.length > 0 &&
        categoryProducts.length == 0) ||
      (stars !== undefined && stars !== 0 && starProducts.length == 0) ||
      (subcategory !== undefined &&
        subcategory.length > 0 &&
        subcategoryProducts.length == 0) ||
      (shipping !== undefined &&
        shipping.length > 0 &&
        shippingProducts.length == 0) ||
      (brand !== undefined && brand.length > 0 && brandProducts.length == 0) ||
      (color !== undefined && color.length > 0 && colorProducts.length == 0)
    )
      res.json(products);

    ///-------------------------------------------------------------------------///

    if (queryProducts.length > 0) {
      queryProducts.forEach((p) => queryId.push(p._id.toString()));
      products.push(queryId);
    }

    if (priceProducts.length > 0) {
      priceProducts.forEach((p) => priceId.push(p._id.toString()));
      products.push(priceId);
    }

    if (categoryProducts.length > 0) {
      categoryProducts.forEach((p) => categoryId.push(p._id.toString()));
      products.push(categoryId);
    }

    if (subcategoryProducts.length > 0) {
      subcategoryProducts.forEach((p) => subcategoryId.push(p._id.toString()));
      products.push(subcategoryId);
    }

    if (brandProducts.length > 0) {
      brandProducts.forEach((p) => brandId.push(p._id.toString()));
      products.push(brandId);
    }

    if (colorProducts.length > 0) {
      colorProducts.forEach((p) => colorId.push(p._id.toString()));
      products.push(colorId);
    }

    if (starProducts.length > 0) {
      starProducts.forEach((p) => starId.push(p._id.toString()));
      products.push(starId);
    }

    if (shippingProducts.length > 0) {
      shippingProducts.forEach((p) => shippingId.push(p._id.toString()));
      products.push(shippingId);
    }

    if (products.length <= 0) {
      res.json(products);
    }

    var result = products.shift().filter((v) => {
      return products.every((a) => {
        return a.indexOf(v) !== -1;
      });
    });

    const total = await Product.find({ _id: result }).countDocuments();
    currentPage = (currentPage - 1) * 3 >= total ? 1 : page;

    finalProducts = await Product.find({ _id: result })
      .populate("category")
      .populate("subcategories")
      .populate("brand")
      .populate("ratings.postedBy")
      .skip((currentPage - 1) * limit)
      .limit(Number(limit))
      .exec();

    console.log("page : ", page);
    res.json({ total, finalProducts });
  } catch (error) {
    console.log(error.message);
  }
};

//star rating
const handleStar = async (req, res, stars) => {
  const aggregateId = await Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ]);

  const products = await Product.find({ _id: aggregateId });
  return products;
};

//shipping
const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({
    shipping,
  });

  return products;
};

//color
const handleColor = async (req, res, color) => {
  const products = await Product.find({
    color,
  });

  return products;
};

//brand
const handleBrand = async (req, res, brand) => {
  const products = await Product.find({
    brand,
  });

  return products;
};

//sub category
const handleSubcategory = async (req, res, subcategory) => {
  const products = await Product.find({
    subcategories: subcategory,
  });

  return products;
};

//category
const handleCategory = async (req, res, category) => {
  const products = await Product.find({
    category,
  });

  return products;
};

//price
const handlePrice = async (req, res, price) => {
  const products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  });

  return products;
};

//search bar
const handleQuery = async (req, res, query) => {
  const searchTitle = query
    ? {
        title: { $regex: query, $options: "i" },
      }
    : {};

  const searchDesc = query
    ? {
        description: { $regex: query, $options: "i" },
      }
    : {};

  const productsTitle = await Product.find({ ...searchTitle })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("brand", "_id name")
    .exec();

  const productsDesc = await Product.find({ ...searchDesc })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("brand", "_id name")
    .exec();

  let products = [];
  let productSet = new Set();

  if (productsTitle.length > 0) {
    productsTitle.forEach((p) => productSet.add(p._id.toString()));
  }
  if (productsDesc.length > 0) {
    productsDesc.forEach((p) => productSet.add(p._id.toString()));
  }

  for (let item of productSet.keys()) {
    const result = await Product.findOne({ _id: item });
    products.push(result);
  }

  return products;
};

module.exports = { getProductsBySearchFilter };
