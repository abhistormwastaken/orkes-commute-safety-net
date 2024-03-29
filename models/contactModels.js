const mongoose=require("mongoose")

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the contact name"],

    },
    email:{
        type:String,
        required:[true,"Please add Email"],
    },
    phone:{
        type:String,
        required:[true,"Please add Email"],
    },
},
    {
        timestamps:true,
    },
    
)

module.exports=mongoose.model("Contacts", contactSchema)