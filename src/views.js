import { getRecipes, amountIngredients, saveRecipes, findRecipe, removeStep, removeIngredient } from './recipes'
import { getFilters } from './filters';

const renderRecipes = () => {
    const recipesFieldElement = document.querySelector('#recipe-list-field')
    const recipes = getRecipes()
    const { nameSearch, ingredientSearch } = getFilters()
    const filteredRecipes = recipes.filter((recipe) => {
        const hasName = recipe.name.toLowerCase().includes(nameSearch.toLowerCase())
        const ingredients = recipe.ingredients
        const hasIngredient = ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(ingredientSearch.toLocaleLowerCase()))
        return hasName && hasIngredient
    })

    recipesFieldElement.innerHTML = ''
    if (filteredRecipes.length > 0){
        filteredRecipes.forEach((recipe) => {
            const recipeElement = generateRecipeDOM(recipe)
            recipesFieldElement.appendChild(recipeElement)
        })
    } else {
        const noRecipesMessage = document.createElement('p')
        // noRecipesMessage.classList.add('empty-message')
        noRecipesMessage.textContent = 'No recipes to show'
        recipesFieldElement.appendChild(noRecipesMessage)
    }
}

const generateRecipeDOM = (recipe) => {
    const recipeCardElement = document.createElement('a')
    const recipeNameElement = document.createElement('h3')
    const ingredientStatusElement = document.createElement('p')

    recipeNameElement.textContent = recipe.name ? recipe.name : 'unnamed reciped'
    recipeCardElement.appendChild(recipeNameElement)

    ingredientStatusElement.textContent = amountIngredients(recipe)
    recipeCardElement.appendChild(ingredientStatusElement)

    recipeCardElement.setAttribute('href', `/edit.html#${recipe.id}`)
    // recipeCardElement.classList.add('recipe-card')
    
    return recipeCardElement
}

const renderRecipeToEdit = (id) => {
    const recipeNameElement = document.querySelector('#recipe-name')
    const stepsFieldElement = document.querySelector('#steps-field')
    const ingredientsFieldElement = document.querySelector('#ingredients-field')
    const recipeToRender = findRecipe(id)

    recipeNameElement.value = recipeToRender.name

    stepsFieldElement.innerHTML = ''
    if (recipeToRender.instructions.length > 0) {
        recipeToRender.instructions.forEach((step) => {
            const stepElement = generateStepElementDOM(recipeToRender, step)
            stepsFieldElement.appendChild(stepElement)
        })
    } else {
        const noStepsMessageElement = document.createElement('p')
        noStepsMessageElement.textContent = 'no instructions for this recipe'
        stepsFieldElement.appendChild(noStepsMessageElement)
    }
    
    ingredientsFieldElement.innerHTML = ''
    if (recipeToRender.ingredients.length > 0) {
        recipeToRender.ingredients.forEach((ingredient) => {
            const ingredientElement = generateIngredientElementDOM(recipeToRender, ingredient)
            ingredientsFieldElement.appendChild(ingredientElement)
        })
    } else {
        const noIngredientsMessageElement = document.createElement('p')
        noIngredientsMessageElement.textContent = 'no ingredients for this recipe'
        ingredientsFieldElement.appendChild(noIngredientsMessageElement)
    }
}

const generateStepElementDOM = (recipe, step) => {
    const stepFieldElement = document.createElement('li')
    const stepTextElement = document.createElement('textarea')
    const removeStepElement = document.createElement('button')

    stepTextElement.value = step.text
    stepTextElement.addEventListener('input', (event) => {
        step.text = event.target.value
        saveRecipes()
    })
    stepFieldElement.appendChild(stepTextElement)

    removeStepElement.textContent = 'remove step'
    removeStepElement.addEventListener('click', (event) => {
        removeStep(recipe, step.id)
        renderRecipeToEdit(recipe.id)
    })
    stepFieldElement.appendChild(removeStepElement)

    return stepFieldElement
}

const generateIngredientElementDOM = (recipe, ingredient) => {
    const ingredientElement = document.createElement('label')
    const haveElement = document.createElement('input')
    const nameElement = document.createElement('span')
    const removeIngredientElement = document.createElement('button')

    haveElement.setAttribute('type', 'checkbox')
    haveElement.checked = ingredient.have
    haveElement.addEventListener('change', (event) => {
        ingredient.have = event.target.checked
        saveRecipes()
    })
    ingredientElement.appendChild(haveElement)

    nameElement.textContent = ingredient.name
    ingredientElement.appendChild(nameElement)
    
    removeIngredientElement.textContent = 'remove'
    removeIngredientElement.addEventListener('click', (event) => {
        removeIngredient(recipe, ingredient.name)
        renderRecipeToEdit(recipe.id)
    })
    ingredientElement.appendChild(removeIngredientElement)

    return ingredientElement
}

export { renderRecipes, renderRecipeToEdit }