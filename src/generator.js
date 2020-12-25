import { getTags } from './recipe.js'
import { setFilters, getFilters } from './filters'
import { generateRandomRecipeDOM } from './view.js'


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




