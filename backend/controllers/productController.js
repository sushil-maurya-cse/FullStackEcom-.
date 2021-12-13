const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandlers");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const ApiFeature = require("../utils/apiFeatures");

// create product
exports.createProduct = CatchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

// Update All Products
exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, product });
});


// Get All Products
exports.getAllProducts = CatchAsyncError(async (req, res, next) => {
  
  const productsCount = await Product.countDocuments();
  const resultPerPage = 8;
  const api = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
   
    let products=await api.query;
  
    let filteredProductCount=products.length;
  
    api.pagination(resultPerPage)
    products = await api.query.clone();

  res.status(200).json(
    { success: true,
     products,
     productsCount,
     resultPerPage,
     filteredProductCount });
});



exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Product Details

exports.getProductdetails = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


// Create Product Reviews
exports.createProductReview = CatchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;


  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.review.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.review.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.review.push(review);
    product.numOfreview = product.review.length;
  }

  let avg = 0;

  product.review.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.review.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews for a particular products

exports.getProductReviews = CatchAsyncError(async (req, res, next) => {


  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }


  res.status(200).json({
    success: true,
    review: product.review,
  });
});

// Delete Review 

exports.deleteReview = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);


  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const review = product.review.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  review.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (review.length === 0) {
    rating = 0;
  } else {
    rating = avg / review.length;
  }

  const numOfreview = review.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      review,
      rating,
      numOfreview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});


