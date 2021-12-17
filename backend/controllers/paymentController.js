const CatchAsyncError = require("../middleware/CatchAsyncError");

const stripe= require("stripe")(process.env.STRIPE_SECRET);

exports.processPayment = CatchAsyncError(async (req, res, next) => {
     const myPayment = await stripe.paymentIntents.create({
       amount: req.body.amount,
       currency:"inr",
       metadata : {
         company: "FullStack Ecommerce"
       },
     });
     res.status(200).json({
       success:true,
       client_secret:myPayment.client_secret
     })
  });


  exports.sendStripeApiKey = CatchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });