const mongo=require('mongoose')
const ModelSchema=new mongo.Schema({
    title:{
        type:String,
        required: true

    },
    description:{
        type:String,
        required: true
    }
})
const Model=mongo.model('Model', ModelSchema)
module.exports=Model