import { findRecipe, addStep, destroyRecipe, addIngredient, saveRecipes } from './recipes'
import { renderRecipeToEdit } from './views'

const recipeNameElement = document.querySelector('#recipe-name')
const stepsFieldElement = document.querySelector('#steps-field')
const newStepFormElement = document.querySelector('#new-step-form')
const ingredientsFieldElement = document.querySelector('#ingredients-field')
const newIngredientFormElement = document.querySelector('#new-ingredient-form')
const deleteButtonElement = document.querySelector('#delete-button')
const recipeId = location.hash.substring(1)

renderRecipeToEdit(recipeId)

recipeNameElement.addEventListener('input', (event) => {
    const recipeToEdit = findRecipe(recipeId)
    recipeToEdit.name = event.target.value.trim() === '' ? 'unnamed recipe' : event.target.value.trim()
    saveRecipes()
})

newStepFormElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const newStepData = event.target.elements.newStepText.value.trim()
    if (newStepData) {
        const recipeToEdit = findRecipe(recipeId)
        addStep(recipeToEdit, newStepData)
        renderRecipeToEdit(recipeId)
        event.target.elements.newStepText.value = ''
    }
})

newIngredientFormElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const newIngredientData = event.target.elements.newIngredientText.value.trim()
    if (newIngredientData) {
        const recipeToEdit = findRecipe(recipeId)
        addIngredient(recipeToEdit, newIngredientData)
        renderRecipeToEdit(recipeId)
        event.target.elements.newIngredientText.value = ''
    }
    
})

deleteButtonElement.addEventListener('click', (event) => {
    destroyRecipe(recipeId)
    location.assign('./index.html')
})