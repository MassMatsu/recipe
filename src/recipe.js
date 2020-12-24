import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { getFilters } from './filters'

let recipes = []

// get saved recipes or [] if no recipes saved
const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')
  try {
    return recipesJSON ? JSON.parse(recipesJSON) : []
  } catch(e) {
    return []
  }
}

// save recipes array if any change
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

// get recipes array
const getRecipes = () => recipes

// create a new recipe and store in the recipes array
const createRecipes = () => {
  const id = uuidv4()
  const timeStamp = moment().valueOf()
  
  recipes.push({
    id: id,
    title: '',
    steps: '',
    ingredients: [],
    createdAt: timeStamp,
    updatedAt: timeStamp
  })
  saveRecipes()
  return id // just for appendix to create a link for a recipe to edit page
}

// delete a recipe from the recipes
const removeRecipe = (id) => {
  const index = recipes.findIndex((recipe) => recipe.id === id)
  if (index > -1) {
    recipes.splice(index, 1)
  }
  saveRecipes()
}

// update a recipe according to updates object
const updateRecipe = (id, updates) => {
  const recipe = recipes.find((recipe) => recipe.id === id)

  if (!recipe) {
    return
  }
  if (typeof updates.title === 'string') {
    recipe.title = updates.title
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof updates.steps === 'string') {
    recipe.steps = updates.steps
    recipe.updatedAt = moment().valueOf()
  }
  saveRecipes()
}

const getSortedRecipes = (sortBy) => {
  if (sortBy === 'byEdited') {
    return recipes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt){
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return recipes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy ===  'alphabetical') {
    return recipes.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
  }
}

// create an ingredient and store in ingredients array of a recipe
const createIngredient = (id, ingredient) => {
  const recipe = recipes.find((recipe) => recipe.id === id)
  const ingredientId = uuidv4()

  if (typeof ingredient === 'string') {
    recipe.ingredients.push({
      id: ingredientId,
      ingredient: ingredient,
      isAvailable: false
    })
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  }
}

// delete an ingredient from the ingredients array
const removeIngredient = (id, ingredientId) => {
  const recipe = recipes.find((recipe) => recipe.id === id)
  if(!recipe){
    return
  }
  const index = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
  if (index > -1) {
    recipe.ingredients.splice(index, 1)
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  } 
}

// toggle an ingredient property 'isAvailable' for a recipe
const toggleIngredient = (id, ingredientId) => {
  const recipe = recipes.find((recipe) => recipe.id === id)
  if (!recipe) {
    return
  }
  const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === ingredientId)
  if (ingredient) {
    ingredient.isAvailable = !ingredient.isAvailable
    saveRecipes()
  }
}

// update an ingredient
const updateIngredient = (id, ingredientId, updates) => {
  const recipe = recipes.find((recipe) => recipe.id === id)
  if (!recipe) {
    return
  }
  const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === ingredientId)
  if (!ingredient) {
    return
  }
  if (typeof updates.ingredient === 'string'){
    ingredient.ingredient = updates.ingredient
    saveRecipes()
  } 
}

// get a recipe data from API and save them onto my recipe collection
const transferRecipe = (transferredRecipe) => {
  // create new recipe and assign data from API to each recipe property
  createRecipes()
  const recipe = recipes[recipes.length -1]
  recipe.title = transferredRecipe.title
  recipe.steps = transferredRecipe.instructions

  transferredRecipe.extendedIngredients.forEach((ingredient) => {
    createIngredient(recipe.id, ingredient.original)
  })
  saveRecipes()
}


const getTags = () => {
  const dishType = getFilters().dishType
  if (dishType.length > 0) {
    return `&tags=${dishType.join(',')}`
  } else {
    return ''
  }
}

const getRandomRecipe = async (tags) => {
  console.log('tags', tags)
  const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=bf82a06b63164f8b85477b4eb26e581c&number=1${tags}`)

  if (response.status === 200) {
    const data = await response.json()
    console.log(data.recipes[0]) // from here, return data.recipes[0] to get it ready to use such as data.title..
    return data.recipes[0]
  } else {
    throw new Error('unable to get a recipe')
  }
}

recipes = loadRecipes()
console.log(loadRecipes())

export { loadRecipes, getRecipes, saveRecipes, createRecipes, removeRecipe, updateRecipe, transferRecipe, createIngredient, removeIngredient, toggleIngredient, getSortedRecipes, getTags, getRandomRecipe }