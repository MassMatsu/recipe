const filters = {
  searchText: '',
  searchIngredient: '',
  sortBy: 'byEdited',
  dishType: []
}

const getFilters = () => filters

const setFilters = (updates) => {
  if (typeof updates.searchText === 'string') {
    filters.searchText = updates.searchText
  }
  if (typeof updates.searchIngredient === 'string') {
    filters.searchIngredient = updates.searchIngredient
  }
  if (typeof updates.sortBy === 'string') {
    filters.sortBy = updates.sortBy
  }
  if (typeof updates === 'string') {
    filters.dishType.push(updates)
  }
}


export { getFilters, setFilters }