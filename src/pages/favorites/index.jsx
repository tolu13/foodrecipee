import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";
import { useContext } from "react";

export default function Favorites(){
    const { favorites, loading} = useContext(GlobalContext);

    if(loading){ return <div>Loading...Please Wait</div>}

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favorites && favorites.length > 0 ? (
        favorites.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-blue-700 font-extrabold">
            Nothing is added to favorites.
          </p>
        </div>
      )}
    </div>
  );
}
