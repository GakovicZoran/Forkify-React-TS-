import { ForkifyHeader } from "../Header/ForkifyHeader";
import { RecipesContainer } from "./RecipesContainer";
import { css } from "@emotion/css";
import { createContext, useState } from "react";
import { IRecipe } from "../Helpers/Interfaces";

const forkifyContainer = css`
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 25px 70px 7px rgb(97 85 81 / 20%);
  max-width: 1200px;
  min-width: 1200px;
  min-height: 1170px;
  margin: 4vw auto;
`;

export const RecipeContext = createContext<any>({});
export const ForkifyContainer = () => {
  const [recipesList, setRecipeList] = useState<IRecipe[]>([]);
  const [bookmarked, setBookmarked] = useState<IRecipe[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<IRecipe[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        recipesList,
        setRecipeList,
        bookmarked,
        setBookmarked,
        isModalOpen,
        setIsModalOpen,
        config,
        setConfig,
      }}
    >
      <div className={forkifyContainer}>
        <ForkifyHeader />
        <RecipesContainer />
      </div>
    </RecipeContext.Provider>
  );
};
