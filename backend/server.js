const app = require('./app');
const dotenv=require('dotenv');
const cloudinary=require("cloudinary");
const connectDatabase=require("./config/database");


// Handling uncaught Exception lokie consoel.log(var) where var not defined
process.on("uncaughtException",err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down our Server due to uncaughtException`);
    process.exit(1)
    
})

dotenv.config({ path: "backend/config/config.env" });

// connect Database

connectDatabase();

/* cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }); */

  cloudinary.config({
    cloud_name: "dkjvzcgfj",
    api_key: "386327642677317",
    api_secret: "ARc9pAFBkWAiT7S70lad-PYT4dw"
  });
  
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is listnening on ${process.env.PORT}`)
})

// Unhandled Promise Rejection  

process.on("unhandledRejection",err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down our Server due to unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
})