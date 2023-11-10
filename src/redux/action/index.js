export const addToShoppingList = (ingredients) => {
  return {
    type: "ADD_TO_SHOPPING_LIST",
    payload: ingredients,
  };
};

export const deleteFromShoppingList = (ingredients) => {
  return {
    type: "DEDLETE_FROM_SHOPPING_LIST",
    payload: ingredients,
  };
};

export const updateShoppingList = (ingredientName, newQuantity) => ({
  type: "UPDATE_SHOPPING_LIST",
  payload: { name: ingredientName, quantity: newQuantity },
});

export const addToList = (itemName, quantity) => ({
  type: "ADD_TO_LIST",
  payload: { name: itemName, qty: quantity },
});
