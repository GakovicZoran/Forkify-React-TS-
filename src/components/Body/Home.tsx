import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const welcome = css`
  background-color: #f9f5f3;
  width: 70%;
  & h3 {
    margin: 150px 160px;
    color: gray;
  }
`;

const heartIcon = css`
  padding-right: 5px;
  font-size: 25px;
`;
export const Home = () => {
  return (
    <div className={welcome}>
      <h3>
        <FontAwesomeIcon className={heartIcon} icon={faHeart} />
        Start by adding or searching a recipe. Have a fun!
      </h3>
    </div>
  );
};
