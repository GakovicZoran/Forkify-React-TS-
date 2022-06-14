import { AsideListOfRecipes } from "./AsideListOfRecipes";
import { RecipeDescription } from "./RecipeDescription";
import { RecipeContext } from "./ForkifyContainer";
import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { css } from "@emotion/css";
import { db } from "../Helpers/firebaseConfig";
import { getDocs } from "firebase/firestore";
import { ConfigInputs } from "../Header/ConfigForkify/ConfigInputs";

const recipesContainer = css`
  display: flex;
  height: 111vh;
`;

export const RecipesContainer = () => {
  const { setRecipeList, isModalOpen } = useContext(RecipeContext);

  useEffect(() => {
    const rentingCollectionRef = db.collection("recipes");
    const getRecipesInfo = async () => {
      try {
        const data = await getDocs(rentingCollectionRef);
        setRecipeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error(err);
      }
    };

    getRecipesInfo();
  }, [isModalOpen]);

  return (
    <div className={recipesContainer}>
      <AsideListOfRecipes />
      <Routes>
        <Route path=":id" element={<RecipeDescription />} />
        <Route path="/" element={<Home />} />
        <Route path="config" element={<ConfigInputs />} />
      </Routes>
    </div>
  );
};
