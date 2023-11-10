const initialState = {
  list: [],
  selectedItem: null,
};

const handleShoppingList = (state = initialState, action) => {
  const ingredient = action.payload;
  switch (action.type) {
    case "ADD_TO_SHOPPING_LIST":
      // const existingIngredient = state.list.find(
      //   (item) => item.name === ingredient.name
      // );
      const existingIngredientIndex = state.list.findIndex(
        (item) => item.name === ingredient.name
      );
      if (existingIngredientIndex !== -1) {
        const updatedList = [...state.list]; // Spread the list, not the entire state
        updatedList[existingIngredientIndex].qty += action.payload.quantity;
        return { ...state, list: updatedList }; // Update the 'list' property
      } else {
        const newIngredient = { ...ingredient, qty: ingredient.quantity };
        return { ...state, list: [...state.list, newIngredient] }; // Add a new ingredient to the 'list' property
      }

    case "DEDLETE_FROM_SHOPPING_LIST":
      const updatedList = state.list.filter(
        (item) => item.name !== action.payload
      );
      return { ...state, list: updatedList };

    case "UPDATE_SHOPPING_LIST":
      const updatedList2 = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return { ...item, qty: action.payload.quantity };
        }
        return item;
      });
      return { ...state, list: updatedList2 };

    case "ADD_TO_LIST":
      const newItem = {
        name: action.payload.name,
        qty: action.payload.qty,
      };
      return { ...state, list: [...state.list, newItem] };
    default:
      return state;
  }
};

export default handleShoppingList;
