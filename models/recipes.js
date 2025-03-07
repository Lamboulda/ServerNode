import mongoose, {Schema} from "mongoose"

const recipesSchema = new Schema({
    tittle : {
        type : String,
        required : true,
    },
    category : {
        type : String
    },
    pays : {
        type : String
    },
    description : {
        type : String
    },
    ingredients : [{type : String}],
    steps : [{type : String}],
    author : {
        type : Schema.types.ObjectId, ref : 'User'
    },
})

export default mongoose.model('Recipe', recipesSchema)