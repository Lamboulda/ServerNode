import recipes from "../models/recipes";

export const getAllRecipes = async (req, res) => {
    try{
        const Recipe = await recipes.find().populate('author', 'first_name last_name')
        return res.status(200).json(Recipe)
        }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const createNewRecipe = async (req,res) => {
    const { title, category, country, description, ingredients, steps } = req.body
    const authorId = req.user.id

    const newRecipe = new recipes({
        title,
        category,
        country,
        description,
        ingredients,
        steps,
        author: authorId,
      })

    try{
        await newRecipe.save()
        return res.status(201).json({message: 'Recipe added',recipes: newRecipe})

    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const getRecipeByID = async (req,res) => {
    try{
        const Recipe = await recipes.findById(req.params.id).populate('author');
        if (!Recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json(Recipe)
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }
}

export const updateRecipe = async (req,res) => {
    const {title, category, country, description, ingredients, steps} = req.body

    try{
        const updatedRecipe = await recipes.findByIdAndUpdate(
            req.params.id, req.body, { new: true })

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        return res.status(200).json({message: 'Recipe updated', recipe: updatedRecipe})

    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const deleteRecipe = async (req,res) => {
    try {
        const deletedRecipe = await recipes.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted' });
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}