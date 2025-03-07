import { Router } from "express"
import { createNewRecipe, deleteRecipe, getAllRecipes, getRecipeByID, updateRecipe } from "../controllers/recipesController"

const recipesRouter = Router()

recipesRouter.get('/recipes', getAllRecipes)
recipesRouter.get('/recipes/:id', getRecipeByID)

recipesRouter.post('/recipes', createNewRecipe)

recipesRouter.put('/recipes/:id', updateRecipe)

recipesRouter.delete('/recipes/:id', deleteRecipe)

export default recipesRouter