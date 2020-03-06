import React, { createContext } from 'react';

const CategoriesContext = createContext({
    categories: ['1','2'],
    onCategoryChanged: (selectedCategoryName) => {
    },
});

export default CategoriesContext