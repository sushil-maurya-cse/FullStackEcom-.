const express= require('express');
const app = express();
const errormiddleware=require('./middleware/Error')
const cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload=require('express-fileupload')

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())

// Route imports

const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)


//middleware errorx
app.use(errormiddleware);

module.exports=app;