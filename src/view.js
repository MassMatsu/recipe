import { getRecipes, getSortedRecipes, toggleIngredient, removeIngredient, getRandomRecipe, transferRecipe } from './recipe.js'
import { getFilters } from './filters.js'
import moment from 'moment'

// DOM for individual recipe
const generateRecipeDOM = (recipe) => {
  const recipeEl = document.createElement('a')
  const titleEl = document.createElement('p')

  if (recipe.title.length > 0) {
    titleEl.textContent = recipe.title
  } else {
    titleEl.textContent = 'unnamed recipe'
  }
  recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
  recipeEl.appendChild(titleEl)
  
  return recipeEl
}
// render filtered recipes on index.html
const renderRecipes = () => {
  const filters = getFilters()
  const recipes = getSortedRecipes(filters.sortBy)
  const recipeEl = document.querySelector('#recipes')

  console.log('sorted', recipes)
  console.log(filters.searchText)
  console.log(filters.searchIngredient)

  // sort them in selected order
  //filteredRecipes = sortRecipes(filters.sortBy)

  // filter recipes according to searchText
  let filteredRecipes = recipes.filter((recipe) => {
    console.log(recipe.title.toLowerCase().includes(filters.searchText.toLocaleLowerCase()))
    return recipe.title.toLowerCase().includes(filters.searchText.toLocaleLowerCase())
  })
  
  console.log('filtered', filteredRecipes)
  // filter filteredRecipes for further filtering -> filter each recipe's ingredients to check if each ingredient includes input text
  filteredRecipes = filteredRecipes.filter((recipe) => {
    const ingredients = recipe.ingredients.filter((ingredient) => {
      return ingredient.ingredient.toLowerCase().includes(filters.searchIngredient.toLowerCase())
    })
    // if there is no input for search, return true to add all recipe to filteredRecipes
    if(!filters.searchIngredient){
      console.log('more filtered', filteredRecipes)
      return true
    } else {
      // if there is any element of array, return true to add a recipe to filteredRecipes
      return ingredients.length > 0 ? true : false
    }
  })
  console.log('another filtered', filteredRecipes)
  // reset the display before rendering with latest recipes data
  recipeEl.innerHTML = ''

  // display all filteredRecipes or show empty message
  if (filteredRecipes.length > 0) { 
    filteredRecipes.forEach((recipe) => {
      recipeEl.appendChild(generateRecipeDOM(recipe))
    })
  } else {
    const messageEl = document.createElement('p')
    messageEl.textContent = 'you have no recipes, add your fav recipes!!'
    messageEl.classList.add('empty-message')
    recipeEl.appendChild(messageEl)
  } 
}
// 
const generateLastEdited = (timeStamp) => {
  return `last edited ${moment(timeStamp).fromNow()}`
}

// render edit page
const initialiseEditPage = (recipeId) => {
  const titleEl = document.querySelector('#recipe-title')
  const stepsEl = document.querySelector('#recipe-steps')
  const dateEl = document.querySelector('#last-edited')
  const ingredientsEl = document.querySelector('#ingredients')

  // get recipes from saved recipes on localStorage
  const recipes = getRecipes() 
  const recipe = recipes.find((recipe) => recipe.id === recipeId)
  console.log('recipe', recipe.title)

  if (!recipe) {
    location.assign('/index.html')
  }
  // assign initial value on each html elements
  titleEl.value = recipe.title
  stepsEl.value = recipe.steps
  dateEl.textContent = generateLastEdited(recipe.updatedAt)

  ingredientsEl.innerHTML = ''
  //generate DOM for ingredient
  if (recipe.ingredients) {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientEl = document.createElement('label')
      const containerEl = document.createElement('div')
      const checkBoxEl = document.createElement('input')
      const ingredientTitleEl = document.createElement('span')
      const removeButtonEl = document.createElement('button')

      // create checkbox element
      checkBoxEl.setAttribute('type', 'checkbox')
      checkBoxEl.checked = ingredient.isAvailable
      containerEl.appendChild(checkBoxEl)
      checkBoxEl.addEventListener('change', () => {
        toggleIngredient(recipe.id, ingredient.id)
        console.log(ingredient)
      })

      // create ingredient content element
      ingredientTitleEl.textContent = ingredient.ingredient
      containerEl.appendChild(ingredientTitleEl)

      // create remove button element
      removeButtonEl.textContent = 'remove'
      removeButtonEl.addEventListener('click', () => {
        removeIngredient(recipe.id, ingredient.id)
        renderIngredients(recipeId)
      })
      
      // get ingredientEl ready
      ingredientEl.appendChild(containerEl)
      ingredientEl.appendChild(removeButtonEl)
      
      ingredientsEl.appendChild(ingredientEl)
    })
  } 
}

const renderIngredients = (recipeId) => {
  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)
  const ingredientsEl = document.querySelector('#ingredients')
  console.log('after remove', recipe)
  ingredientsEl.innerHTML = ''
  //generate DOM for ingredient
  if (recipe.ingredients) {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientEl = document.createElement('label')
      const containerEl = document.createElement('div')
      const checkBoxEl = document.createElement('input')
      const ingredientTitleEl = document.createElement('span')
      const removeButtonEl = document.createElement('button')

      // create checkbox element
      checkBoxEl.setAttribute('type', 'checkbox')
      checkBoxEl.checked = ingredient.isAvailable
      containerEl.appendChild(checkBoxEl)
      checkBoxEl.addEventListener('change', () => {
        toggleIngredient(recipe.id, ingredient.id)
        console.log(ingredient)
      })

      // create ingredient content element
      ingredientTitleEl.textContent = ingredient.ingredient
      containerEl.appendChild(ingredientTitleEl)

      // create remove button element
      removeButtonEl.textContent = 'remove'
      removeButtonEl.addEventListener('click', () => {
        removeIngredient(recipe.id, ingredient.id)
        renderIngredients(recipeId)
      })
      
      // get ingredientEl ready
      ingredientEl.appendChild(containerEl)
      ingredientEl.appendChild(removeButtonEl)
      
      ingredientsEl.appendChild(ingredientEl)
    })
  } 
}

const generateRandomRecipeDOM = async (tags) => {
  const recipe = await getRandomRecipe(tags)

  const randomRecipeEl = document.querySelector('#random-recipe')
  randomRecipeEl.textContent = ''

  if (!recipe) {
    console.log('no recipe')
    randomRecipeEl.textContent = 'no recipe matches your query! Please set query again.'
    return
  }
  
  const titleContainerEl = document.createElement('div')
  const titleEl = document.createElement('h2')
  titleEl.textContent = recipe.title
  titleContainerEl.appendChild(titleEl)

  const imageContainerEl = document.createElement('div')
  const imageEl = document.createElement('img')
  imageEl.setAttribute('src', recipe.image)
  imageContainerEl.appendChild(imageEl)

  const summaryContainerEl = document.createElement('div')
  const summaryEl = document.createElement('p')
  summaryEl.innerHTML = recipe.summary
  summaryContainerEl.appendChild(summaryEl)

  const stepsContainerEl = document.createElement('div')
  const stepsEl = document.createElement('p')
  stepsEl.innerHTML = recipe.instructions
  stepsContainerEl.appendChild(stepsEl)

  const ingredientsEl = document.createElement('div')
  recipe.extendedIngredients.forEach((ingredient) => {
    //const ingredientsEl = document.createElement('div')
    const ingredientEl = document.createElement('p')
    ingredientEl.textContent = ingredient.original
    ingredientsEl.appendChild(ingredientEl)
  })

  randomRecipeEl.appendChild(titleContainerEl)
  randomRecipeEl.appendChild(imageContainerEl)
  randomRecipeEl.appendChild(summaryContainerEl)
  randomRecipeEl.appendChild(stepsContainerEl)
  randomRecipeEl.appendChild(ingredientsEl)
  
  // save generated recipe to my recipe collection if you like!
  document.querySelector('#add-recipe').addEventListener('click', () => {
    transferRecipe(recipe)
    alert('new recipe has been added on your collection!')
  })
}

export { renderRecipes, initialiseEditPage, generateLastEdited, renderIngredients, generateRandomRecipeDOM }