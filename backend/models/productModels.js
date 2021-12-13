const mongoose=require('mongoose');
 const productSchema=new mongoose.Schema({
     name:{
         type: 'string',
         required: [true,"Please Enter product name"],
         trim:true,
     },
     description:{
         type: 'string',
         required: [true,"Please Enter description"]
     },
     price:{
         type: 'number',
         required: [true,"Please Enter price"],
         maxLength:[8,"Price can not exceed 8 character"]
     },
     ratings:{
         type:'number',
         default:0
     },
     images:[{
         public_id:{type:'string', required:true},
         url:{type:'string', required:true}
     }],
     category:{type:'string', required:[true,"please enter category"]},
     stock:{
        type:'number',
        required:[true,"Please enter Stock"],
        maxLength:[4,"Stock cannot exceed more then 4 digits"],
        default:1
    },
    numOfreview:{
       type:Number,
       default: 0,
    },
    review:[
        {
            user: {
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:'string',
                required: [true,"Please Enter your name"]
            },
            rating:{
                type:'number',
                require:true
            },
            comment:{
                type:'string',
                required: [true,"Please Enter Comment"]
            }
        }
    ],
    user: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:'date',
        default:Date.now()
    }
 })


 

 module.exports = mongoose.model('Product',productSchema);