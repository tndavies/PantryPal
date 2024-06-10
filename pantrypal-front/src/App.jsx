import RecipeDisplay from "./RecipeDisplay";
import SideBar from "./SideBar";

export default function App() {

  return (
    <>
      <div id="container">
        <SideBar />
        <RecipeDisplay />
      </div>
    </>
  );
}