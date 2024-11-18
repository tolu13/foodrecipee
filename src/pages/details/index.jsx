import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();

  const {
    recipeDetailsList,
    setRecipeDetailsList,
    handleAddToFavorites,
    favorites,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      console.log(data);
      if (data?.data) {
        setRecipeDetailsList(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  console.log(recipeDetailsList);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-9">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden roundex-xl group">
          <img
            alt=""
            src={recipeDetailsList?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <span className="text-sm text-cyan-400 font-medium">
          {recipeDetailsList?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-gray">
          {recipeDetailsList?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorites(recipeDetailsList?.recipe)}
            className="p-3 px-8 rounded-lg bg-blue-700 text-sm uppercase font-medium tracking-wider text-white mt-3 inline-block shadow"
          >
            { favorites && favorites.length > 0  && favorites.findIndex(
              (item) => item.id === recipeDetailsList?.recipe?.id
            ) !== -1
              ? "Remove from Favorites"
              : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsList?.recipe?.ingredients.map((ingredient) => (
              <li>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
