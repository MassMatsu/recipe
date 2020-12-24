import { createRecipes } from './recipe.js'
import { renderRecipes } from './view.js'
import { getFilters, setFilters } from './filters'


renderRecipes()

document.querySelector('#create-recipe').addEventListener('click', () => {
  const id = createRecipes()
  location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  })
  console.log(getFilters())
  renderRecipes()
})

document.querySelector('#search-text-ingredient').addEventListener('input', (e) => {
  setFilters({
    searchIngredient: e.target.value
  })
  console.log(getFilters())
  renderRecipes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value
  })
  console.log(e.target.value)
  console.log(getFilters())
  renderRecipes()
})



