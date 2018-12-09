import { createRecipe, destroyRecipe, getRecipes } from './recipes'
import { renderRecipes } from './views'
import {setFilters} from './filters'
renderRecipes()

const recipeSearchElement = document.querySelector('#recipe-search')
const ingredientSearchElement = document.querySelector('#ingredient-search')
const newRecipeBtnElement = document.querySelector('#new-recipe-button')

recipeSearchElement.addEventListener('input', (event) => {
    setFilters({nameSearch: event.target.value})
    renderRecipes()
})

ingredientSearchElement.addEventListener('input', (event) => {
    setFilters({ingredientSearch: event.target.value})
    renderRecipes()
})

newRecipeBtnElement.addEventListener('click', (event) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})