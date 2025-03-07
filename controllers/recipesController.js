import Recipes from "../models/recipes.js";

export const getAllRecipes = async (req, res) => {
    try{
        const recipe = await Recipes.find().populate('author', 'first_name last_name')
        return res.status(200).json(recipe)
        }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const createNewRecipe = async (req,res) => {
    const { title, category, country, description, ingredients, steps } = req.body
    const authorId = req.user.id

    const newRecipe = new Recipes({
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
        return res.status(201).json({message: 'Recipe added',Recipes: newRecipe})

    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const getRecipeByID = async (req,res) => {
    try{
        const recipe = await Recipes.findById(req.params.id).populate('author');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json(recipe)
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }
}

export const updateRecipe = async (req,res) => {
    const {title, category, country, description, ingredients, steps} = req.body

    try{
        const updatedRecipe = await Recipes.findByIdAndUpdate(
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
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted' });
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}