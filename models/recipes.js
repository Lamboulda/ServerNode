import mongoose, {Schema} from "mongoose"

const recipesSchema = new Schema({
    tittle : {
        type : String,
        required : true,
    },
    category : {
        type : String
    },
    country : {
        type : String
    },
    description : {
        type : String
    },
    ingredients : [{type : String}],
    steps : [{type : String}],
    author : {
        type : Schema.Types.ObjectId, ref : 'User'
    },
})

export default mongoose.model('Recipe', recipesSchema)