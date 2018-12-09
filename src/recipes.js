import uuidv4 from 'uuid/v4'

let recipes = []

const createRecipe = () => {
    const id = uuidv4()
    
    recipes.push({
        id: id,
        name: 'unnamed recipe',
        instructions: [],
        ingredients: []
    })
    saveRecipes()

    return id
}

const destroyRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => id === recipe.id)
    recipes.splice(recipeIndex, 1)
    saveRecipes()
}

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        recipesJSON ? recipes = JSON.parse(recipesJSON) : recipes = []
    } catch (err) {
        console.log(err)
        recipes = []
    }
}

const amountIngredients = (recipe) => {
    let amount
    const have = recipe.ingredients.filter((ingredient) => ingredient.have === true)
    if (have.length === recipe.ingredients.length) {
        amount = 'all the'
    } else if (have.length === 0) {
        amount = 'none of the'
    } else {
        amount = `${have.length} of ${recipe.ingredients.length}`
    }
    return `You have ${amount} ingredients`
}

const addIngredient = (recipe, ingredientName) => {
    if (recipe.ingredients.every((ingredient) => ingredientName !== ingredient.name)) {
        recipe.ingredients.push({
            name: ingredientName,
            have: false
        })
    }
    saveRecipes()
}

const removeIngredient = (recipe, ingredientName) => {
    const index = recipe.ingredients.findIndex((ingredient) => ingredient.name === ingredientName)
    recipe.ingredients.splice(index, 1)
    saveRecipes()
}

const addStep = (recipe, text) => {
    recipe.instructions.push({
        id: uuidv4(),
        text
    })
    saveRecipes()
}

const removeStep = (recipe, stepId) => {
    const index = recipe.instructions.findIndex((step) => step.id === stepId)
    recipe.instructions.splice(index, 1)
    saveRecipes()
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const findRecipe = (recipeId) => {
    const recipes = getRecipes()
    return recipes.find((recipe) => recipe.id === recipeId)
}

loadRecipes()

export { saveRecipes, createRecipe, destroyRecipe, getRecipes, amountIngredients, findRecipe, addStep, removeStep, addIngredient, removeIngredient }