import { useContext, useState } from "react";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { RecipeContext } from "../../Body/ForkifyContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IRecipe } from "../../Helpers/Interfaces";

const bookmarkBox = css`
  position: absolute;
  right: -0.5px;
  z-index: 10;
  width: 350px;
  background-color: #fff;
  box-shadow: 0 10px 50px 20px rgba($color-grey-dark-1, 0.1);
  transition: all 0.5s 0.2s;
`;
const bookmarksContainer = css`
  & button {
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    height: 100%;
    padding: 40px 40px 40px 23px;
    text-transform: uppercase;
    transition: all 0.3s;
    gap: 10px;
  }

  & button:hover {
    background-color: #e6e3e3;
    border-radius: 0 9px 0 0;
  }
`;

const BookmarkIcon = css`
widthL 20px;
height: 20px;
color: #f48982;
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

const listUl = css`
  list-style: none;
  margin-bottom: 20px;
  padding: 0;

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

const listBox = css`
  margin-top: 10px;
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

  &:hover {
    background-color: #f9f5f3;
  }
`;

const listImage = css`
  display: block;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
  width: 100%;
`;

export const BookmarksRecipe = () => {
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false);
  const { bookmarked } = useContext(RecipeContext);
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <li
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
      className={bookmarksContainer}
    >
      <button>
        <FontAwesomeIcon className={BookmarkIcon} icon={faBookmark} /> Bookmarks
      </button>

      <div className={bookmarkBox}>
        {isMouseInside ? (
          <ul className={listUl}>
            {bookmarked?.map((bookmark: IRecipe[]) => {
              return bookmark.map((bookmark: IRecipe) => {
                return (
                  <li key={bookmark.id} className={listBox}>
                    <Link
                      to={bookmark.id}
                      onClick={() => {
                        navigate(`${id}`);
                      }}
                    >
                      <figure>
                        <img
                          className={listImage}
                          src={bookmark.image}
                          alt="Loading.."
                        />
                      </figure>
                      <div className={previewData}>
                        <h4>{bookmark.title}</h4>
                        <p>{bookmark.publisher}</p>
                      </div>
                    </Link>
                  </li>
                );
              });
            })}
          </ul>
        ) : null}
      </div>
    </li>
  );
};
