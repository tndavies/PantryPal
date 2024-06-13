import { useEffect, useState } from "react";
import RecipeDisplay from "./RecipeDisplay";
import SideBar from "./SideBar";
import RecipeModal from "./RecipeModal";

export default function App() {
  const [recipes, SetRecipes] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        SetRecipes(data);
      });
  }, []);

  
  return (
    <>
      <SideBar recipes={recipes} SetRecipes={SetRecipes} />
      <RecipeDisplay recipes={recipes} SetRecipes={SetRecipes} />
    </>
  );
}
