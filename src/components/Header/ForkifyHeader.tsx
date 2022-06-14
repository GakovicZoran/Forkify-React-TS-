import { AddRecipe } from "./ModalPopup/AddRecipe";
import { BookmarksRecipe } from "./Bookmarks/BookmarksRecipe";
import forkifyLogo from "../Header/img/forkifyLogo.png";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const forkifyHeader = css`
  align-items: center;
  background-color: #f9f5f3;
  display: flex;
  justify-content: space-between;
  border-radius: 9px;
  border-bottom-left-radius: 0;
  height: 100px;
  position: relative;
`;

const logoImg = css`
  display: block;
  height: 50px;
  margin-left: 40px;
`;

const navBox = css`
  display: flex;
  height: 100%;
  list-style: none;
  align-items: center;
`;

const configBtn = css`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  font-size: 17.5px;
  letter-spacing: 0.3px;
  height: 100%;
  padding: 38.5px 23px;
  text-transform: uppercase;
  transition: all 0.3s;
  gap: 10px;
  margin-bottom: 2px;

  & a {
    text-decoration: none;
    color: black;
  }
  &:hover {
    background-color: #e6e3e3;
  }
`;

const gearIcon = css`
  color: #f48982;
  padding-right: 3px;
  font-size: 19px;
`;

export const ForkifyHeader = () => {
  return (
    <header className={forkifyHeader}>
      <div>
        <img className={logoImg} src={forkifyLogo} alt="Loading logo..." />
      </div>
      <nav>
        <ul className={navBox}>
          <div className={configBtn}>
            <Link to="/config">
              <FontAwesomeIcon icon={faGear} className={gearIcon} /> Config
            </Link>
          </div>
          <AddRecipe />
          <BookmarksRecipe />
        </ul>
      </nav>
    </header>
  );
};
