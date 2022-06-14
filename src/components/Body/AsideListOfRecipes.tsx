import { Link, useNavigate } from "react-router-dom";
import { IRecipe } from "../Helpers/Interfaces";
import { css } from "@emotion/css";
import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { RecipeContext } from "./ForkifyContainer";

const asideListContainer = css`
  display: flex;
  flex-direction: column;
  width: 35%;
`;

const listUl = css`
  list-style: none;
  margin-bottom: 20px;
  padding: 0;
  transition: all 0.4s;

  & a {
    align-items: center;
    border-right: 1px solid #fff;
    display: flex;
    padding: 15px 35px;
    transition: all 0.3s;
  }

  & figure {
    margin: 0;
    backface-visibility: hidden;
    border-radius: 50%;
    flex: 0 0 60px;
    height: 60px;
    overflow: hidden;
  }
`;

const previewData = css`
  width: 100%;
  & h4 {
    margin: 0;
    padding-bottom: 5px;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 17px;
  }
  & p {
    margin: 0;
    max-width: 250px;
    color: #918581;
  }
`;

const listBox = css`
  &:hover {
    background-color: #f9f5f3;
  }
  & div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
  }

  & a {
    text-decoration: none;
    text-transform: uppercase;
    color: #f38e82;
    font-size: 12px;
  }
`;

const listImage = css`
  display: block;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
  width: 100%;
`;

// Search bar style //
const searchBox = css`
  background-color: #fff;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  transition: all 0.3s;
  border: 1px solid #f48911;
`;

const searchRecipe = css`
  background: none;
  border: none;
  font-size: 17px;
  width: 225px;
  height: 50px;
  &:focus {
    border: 0;
    outline: 0;
  }
`;

const btnSubmitRecipe = css`
  font-size: 17px;
  padding: 15px 30px;
  align-items: center;
  background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
  border: none;
  border-radius: 7px;
  border-top-right-radius: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  text-transform: uppercase;
  transition: all 0.2s;
  gap: 10px;

  &:hover {
    transform: scale(1.07);
  }
`;

const searchIcon = css`
  height: 23px;
  width: 23px;
`;

// Pagination Style //
const paginationBox = css`
  margin-top: auto;
  padding: 0 60px;
`;

const paginationBtnsContainer = css`
  display: flex;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  & a {
    background-color: #f9f5f3;
    border: none;
    border-radius: 10rem;
    color: #f38e82;
    cursor: pointer;
    display: flex;
    font-size: 18px;
    font-weight: 600;
    padding: 0.8rem 1.2rem;
    transition: all 0.2s;
  }

  & a:hover {
    color: #f38e82;
    background-color: #e6e3e3;
  }
`;

const paginationActive = css`
  & a {
    color: #f38e82;
    background-color: #e6e3e3;
  }
`;

export const AsideListOfRecipes = () => {
  const [recipeNumber, setRecipeNumber] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const { recipesList } = useContext(RecipeContext);
  const navigate = useNavigate();

  // Search bar //
  const handlerSearchRecipes = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearch("");
  };

  const handlerChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Pagination //
  const recipesPerPage = 8;
  const recipesVisited = recipeNumber * recipesPerPage;
  const displayRecipes = recipesList
    .filter((val: { title: string }) => {
      if (search === "") {
        return val;
      } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    })
    .slice(recipesVisited, recipesVisited + recipesPerPage)
    .map(({ id, title, image, publisher }: IRecipe) => {
      return (
        <li key={id} className={listBox}>
          <Link
            to={id}
            onClick={() => {
              navigate(`${id}`);
            }}
          >
            <figure>
              <img className={listImage} src={image} alt="Loading.." />
            </figure>
            <div className={previewData}>
              <h4>{title}</h4>
              <p>{publisher}</p>
            </div>
          </Link>
        </li>
      );
    });
  const pageCount = Math.ceil(recipesList.length / recipesPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setRecipeNumber(selected);
  };

  return (
    <div className={asideListContainer}>
      <form className={searchBox} onSubmit={handlerSearchRecipes}>
        <input
          className={searchRecipe}
          type="text"
          placeholder="Search over delicious recipes"
          onChange={handlerChanges}
        ></input>
        <button className={btnSubmitRecipe}>
          <FontAwesomeIcon className={searchIcon} icon={faMagnifyingGlass} />
        </button>
      </form>

      <ul className={listUl}>{displayRecipes}</ul>
      <div className={paginationBox}>
        <ReactPaginate
          previousLabel={"Prev"}
          nextAriaLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={paginationBtnsContainer}
          activeClassName={paginationActive}
        />
      </div>
    </div>
  );
};
