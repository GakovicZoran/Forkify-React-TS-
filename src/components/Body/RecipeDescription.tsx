import { css } from "@emotion/css";
import { useParams } from "react-router-dom";
import { IRecipe } from "../Helpers/Interfaces";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faClockRotateLeft,
  faUserGroup,
  faCircleMinus,
  faCirclePlus,
  faHeart,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { RecipeContext } from "./ForkifyContainer";

const recipeDescriptionContainer = css`
  width: 70%;
  background-color: #f9f5f3;

  & h1 {
    bottom: -26px;
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    left: 50%;
    line-height: 1.95;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    transform: translate(-50%, 20%) skewY(-6deg);
    width: 50%;
  }

  & h1 span {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    padding: 20px 25px;
  }
`;

const imageDescription = css`
  height: 300px;
  position: relative;
  transform-origin: top;

  &:before {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    content: "";
    left: 0;
    opacity: 0.4;
    position: absolute;
    top: 0;
  }

  &:before,
  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const recipeDetails = css`
  align-items: center;
  display: flex;
  padding: 60px 70px 60px 90px;
  justify-content: space-between;
`;

const recipeInfo = css`
  align-items: center;
  display: flex;
  font-size: 20px;
`;

const bookmarks = css`
  align-items: center;
  border: 4px solid #fbdb89;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: all 0.2s;
  height: 50px;
  width: 50px;

  &:hover {
    transform: scale(1.05);
  }
`;

const recipeIngredients = css`
  align-items: center;
  background-color: #f2efee;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  line-height: 1.4;
  padding: 40px 60px 0 60px;

  & h2 {
    margin: 0;
    text-transform: uppercase;
    font-size: 23px;
    color: #f38e82;
  }

  & ul {
    display: grid;
    gap: 5px 40px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0;
  }

  & li {
    padding-bottom: 40px;
    font-size: 16px;
    display: flex;
  }
`;

const recipeDirections = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 50px 100px;

  & h2 {
    color: #f38e82;
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
  }

  & p {
    color: #918581;
    font-size: 19px;
    margin-bottom: 30px;
    text-align: center;
  }

  & a {
    align-items: center;
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    border: none;
    border-radius: 100px;
    color: #fff;
    cursor: pointer;
    display: flex;
    text-transform: uppercase;
    transition: all 0.2s;
    padding: 15px 30px;
    text-decoration: none;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const number = css`
  padding: 0 5px 0 15px;
  font-weight: bold;
`;

const servingsStyle = css`
  margin-right: 20px;
`;

const btnsServings = css`
  & button {
    border: none;
    background-color: transparent;
    color: #f48982;
    cursor: pointer;
    font-size: 19px;
  }

  & button:hover {
    transform: scale(1.05);
  }
`;

// Icons
const checkIcon = css`
  color: #f38e82;
  padding-right: 10px;
`;
const heartIcon = css`
  padding-left: 7px;
`;
const recipeDetailsIcon = css`
  color: #f48982;
`;

export const RecipeDescription = () => {
  const [servings, setServings] = useState<number>(0);
  const [bookmarkStyle, setBookmarkStyle] = useState<boolean>(true);
  const { recipesList, bookmarked, setBookmarked } = useContext(RecipeContext);
  let { id } = useParams();

  // Number of servings //
  useEffect(() => {
    recipesList.find((list: { id: string; servings: SetStateAction<number> }) =>
      list.id === id ? setServings(list.servings) : null
    );
  }, [id, recipesList]);

  const incrementNumber = () => {
    setServings(+servings + 1);
  };

  const decrementNumber = () => {
    servings !== 1 && setServings(servings - 1);
  };

  // Bookmark recipe  //
  const iconBookmark = css`
    color: ${bookmarkStyle ? "white" : "#f48982"};
    height: 25px;
    width: 25px;
  `;

  const check = bookmarked?.filter((marked: IRecipe) => marked.id === id);
  const bookmarksBtn = () => {
    setBookmarkStyle(!bookmarkStyle);
    if (check && bookmarkStyle) {
      setBookmarked((prev: IRecipe[]) => {
        return [...prev, recipesList.filter((item: IRecipe) => item.id === id)];
      });
    } else {
      setBookmarked((prev: IRecipe[]) => {
        return prev.filter((prev: IRecipe) => prev.id === id);
      });
    }
  };

  return (
    <div className={recipeDescriptionContainer}>
      {recipesList
        .filter((list: IRecipe) => list.id === id)
        .map((list: IRecipe) => (
          <div key={list.id}>
            <div className={imageDescription}>
              <img src={list.image} alt="Loading.." />

              <h1>
                <span>{list.title}</span>
              </h1>
            </div>
            <div className={recipeDetails}>
              <div className={recipeInfo}>
                <FontAwesomeIcon
                  className={recipeDetailsIcon}
                  icon={faClockRotateLeft}
                />
                <span className={number}>{list.cookingTime}</span>
                <span>MINUTES</span>
              </div>
              <div className={recipeInfo}>
                <FontAwesomeIcon
                  className={recipeDetailsIcon}
                  icon={faUserGroup}
                />
                <span className={number}>{servings}</span>
                <span className={servingsStyle}>SERVINGS</span>
                <div className={btnsServings}>
                  <button onClick={incrementNumber}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </button>
                  <button onClick={decrementNumber}>
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </button>
                </div>
              </div>
              <div></div>
              <button onClick={bookmarksBtn} className={bookmarks}>
                <FontAwesomeIcon className={iconBookmark} icon={faBookmark} />
              </button>
            </div>

            <div className={recipeIngredients}>
              <h2>recipe ingredients</h2>
              <ul>
                {list.ingredients.map((ing: IRecipe, i: number) => {
                  return (
                    <li key={i}>
                      <div>
                        <FontAwesomeIcon className={checkIcon} icon={faCheck} />
                        {ing.quantity
                          ? (ing.quantity * servings) / list.servings
                          : ""}
                      </div>
                      <div>
                        <span> {ing.unit} </span>
                        {ing.description}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={recipeDirections}>
              <h2>how to cook it</h2>
              <p>
                This recipe was carefully designed and tested by{" "}
                <span>{list.publisher}.</span> Please check out directions at
                their website.
              </p>
              <a href="https://octacode.ba/" target="_blank">
                <span>
                  Directions
                  <FontAwesomeIcon className={heartIcon} icon={faHeart} />
                </span>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
};
