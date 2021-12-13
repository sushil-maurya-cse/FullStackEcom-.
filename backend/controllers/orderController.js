const Order = require("../models/orderModels");
const ErrorHandler = require("../utils/errorHandlers");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const ApiFeature = require("../utils/apiFeatures");

const Product = require("../models/productModels");

// Create New Order
exports.newOrder = CatchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    payment,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  const order=await Order.create({
    shippingInfo,
    orderItems,
    payment,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,

  })
  res.status(201).json({
      success: true,
      order,
  })
});

// Get Single order

exports.getSingleOrders = CatchAsyncError(async (req, res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order not foundwith this ID",404));
    }

    res.status(200).json({
        success: true,
        order
    })
})
// get logged in users orders

exports.myOrders = CatchAsyncError(async (req, res,next)=>{

    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success: true,
        orders
    })
})


// Get All orders

exports.getallOrders = CatchAsyncError(async (req, res,next)=>{

    const orders = await Order.find();

    let totalAmounts=0;
    orders.forEach((order)=>{
        totalAmounts +=order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmounts,
        orders
    })
})

// Get All orders

exports.updateOrder = CatchAsyncError(async (req, res,next)=>{

    const order = await Order.findById(req.params.id);

    if(order.orderStatus==="Deleivered"){
        return next(new ErrorHandler("We have Delievered this Order",400));

    }

    order.orderItems.forEach(async(order)=>{
        await updateStocks(order.product,order.quantity)
    })

    order.orderStatus= req.body.status; 

    if(req.body.status==="Deleivered"){
        order.deleiveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success: true,
        order
    });
});


// Update Stocks Function

async function updateStocks(id,qty){
    const product =await Product.findById(id);

    product.stock-=qty;

    await product.save({validateBeforeSave:false})
    
}

// Delete Order


exports.deleteOrder = CatchAsyncError(async (req, res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not foundwith this ID",404));
    }
   
    await order.remove();
   

    res.status(200).json({
        success: true,
    })
})




