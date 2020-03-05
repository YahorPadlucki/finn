import React from 'react'

const CategoriesContext = React.createContext(["1", "2"]);

export const CategoriesProvider = CategoriesContext.Provider;
export const CategoriesConsumer = CategoriesContext.Consumer;
export default CategoriesContext