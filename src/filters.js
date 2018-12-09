const filters = {
    nameSearch: '',
    ingredientSearch: ''
}

const getFilters = () => filters

const setFilters = ({ nameSearch, ingredientSearch }) => {
    if (typeof nameSearch === 'string') {
        filters.nameSearch = nameSearch
    }

    if (typeof ingredientSearch === 'string') {
        filters.ingredientSearch = ingredientSearch
    }
}

export { getFilters, setFilters }