import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsList, setRecipeDetailsList] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/")
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorites(getCurrentItem) {
    console.log(getCurrentItem);

    let cpyFavorites = [...favorites];
    const index = cpyFavorites.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavorites.push(getCurrentItem);
    } else {
      cpyFavorites.splice(index);
    }
    setFavorites(cpyFavorites);
  }

  console.log(favorites, "favorites");

  if (loading) {
    return <div>Loading Data Please wait</div>;
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleAddToFavorites,
        handleSubmit,
        recipeDetailsList,
        setRecipeDetailsList,
        favorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
