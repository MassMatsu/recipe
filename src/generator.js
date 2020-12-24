import { transferRecipe, getRandomRecipe, getTags } from './recipe.js'
import { setFilters, getFilters } from './filters'
import { generateRandomRecipeDOM } from './view.js'


// const getTags = () => {
//   const dishType = getFilters().dishType
//   if (dishType.length > 0) {
//     return `&tags=${dishType.join(',')}`
//   } else {
//     return ''
//   }
// }

// const getRandomRecipe = async (tags) => {
//   console.log('tags', tags)
//   const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=bf82a06b63164f8b85477b4eb26e581c&number=1${tags}`)

//   if (response.status === 200) {
//     const data = await response.json()
//     console.log(data.recipes[0]) // from here, return data.recipes[0] to get it ready to use such as data.title..
//     return data.recipes[0]
//   } else {
//     throw new Error('unable to get a recipe')
//   }
// }

// const generateRandomRecipeDOM = async (tags) => {
//   const recipe = await getRandomRecipe(tags)

//   const randomRecipeEl = document.querySelector('#random-recipe')
//   randomRecipeEl.textContent = ''

//   if (!recipe) {
//     console.log('no recipe')
//     randomRecipeEl.textContent = 'no recipe matches your query! Please set query again.'
//     return
//   }
  
//   const titleContainerEl = document.createElement('div')
//   const titleEl = document.createElement('h2')
//   titleEl.textContent = recipe.title
//   titleContainerEl.appendChild(titleEl)

//   const imageContainerEl = document.createElement('div')
//   const imageEl = document.createElement('img')
//   imageEl.setAttribute('src', recipe.image)
//   imageContainerEl.appendChild(imageEl)

//   const summaryContainerEl = document.createElement('div')
//   const summaryEl = document.createElement('p')
//   summaryEl.innerHTML = recipe.summary
//   summaryContainerEl.appendChild(summaryEl)

//   const stepsContainerEl = document.createElement('div')
//   const stepsEl = document.createElement('p')
//   stepsEl.innerHTML = recipe.instructions
//   stepsContainerEl.appendChild(stepsEl)

//   const ingredientsEl = document.createElement('div')
//   recipe.extendedIngredients.forEach((ingredient) => {
//     //const ingredientsEl = document.createElement('div')
//     const ingredientEl = document.createElement('p')
//     ingredientEl.textContent = ingredient.original
//     ingredientsEl.appendChild(ingredientEl)
//   })

//   randomRecipeEl.appendChild(titleContainerEl)
//   randomRecipeEl.appendChild(imageContainerEl)
//   randomRecipeEl.appendChild(summaryContainerEl)
//   randomRecipeEl.appendChild(stepsContainerEl)
//   randomRecipeEl.appendChild(ingredientsEl)
  
//   // save generated recipe to my recipe collection if you like!
//   document.querySelector('#add-recipe').addEventListener('click', () => {
//     transferRecipe(recipe)
//   })
// }

// generate random recipe according to the query
document.querySelector('#generate-recipe').addEventListener('click', () => {
  const checkBox = document.querySelectorAll('input[type=checkbox]')
  console.log(checkBox)
  checkBox.forEach((checkbox) => {
    if (checkbox.checked) {
      //console.log(checkbox.value)
      setFilters(checkbox.value)
    }
  })
  // set query tags for fetch and generate random recipe according to the query tags selected
  const tags = getTags() 
  generateRandomRecipeDOM(tags)
  getFilters().dishType = []
  console.log(getFilters().dishType)
})

// caution message for add-recipe button pressed before any recipe generated
document.querySelector('#add-recipe').addEventListener('click', () => {
  if (document.querySelector('#random-recipe').textContent === '') {
    //document.querySelector('#message').textContent = 'please generate new recipe first!'
    alert('please generate new recipe first!')
  }
})




