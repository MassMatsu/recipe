import { initialiseEditPage, generateLastEdited } from './view.js'
import { updateRecipe, removeRecipe, createIngredient } from './recipe.js'

const recipeId = location.hash.substring(1)
const dateEl = document.querySelector('#last-edited')

initialiseEditPage(recipeId)
//renderIngredients(recipeId)

document.querySelector('#recipe-title').addEventListener('input', (e) => {
  updateRecipe(recipeId, {
    title: e.target.value.trim()
  })
  dateEl.textContent = generateLastEdited(recipeId.updatedAt)
})

document.querySelector('#recipe-steps').addEventListener('input', (e) => {
  updateRecipe(recipeId, {
    steps: e.target.value
  })
  dateEl.textContent = generateLastEdited(recipeId.updatedAt)
})

document.querySelector('#remove-recipe').addEventListener('click', () => {
  removeRecipe(recipeId)
  location.assign('/index.html')
})

document.querySelector('#new-ingredient').addEventListener('submit', (e) => {
  e.preventDefault()
  const ingredient = e.target.elements.ingredient.value.trim()
  console.log(ingredient)
  if (ingredient.length > 0) {
    createIngredient(recipeId, ingredient)
    initialiseEditPage(recipeId)
  } 
})
