import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Recipes from "./component/Recipes";
import AddNewRecipe from "./component/AddNewRecipe";
import EditRecipe from "./component/EditRecipe";
import ShoppingList from "./component/ShoppingList";

function App() {
  return (
    <div className="body">
      <Navbar />
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add new" element={<AddNewRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="/list" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
