import { css } from "@emotion/css";
import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { RecipeContext } from "../../Body/ForkifyContainer";

const openModalBtn = css`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 100%;
  padding: 40.5px 23px;
  text-transform: uppercase;
  transition: all 0.3s;
  gap: 10px;

  &:hover {
    background-color: #e6e3e3;
  }
`;

const plusIcon = css`
  border: none;
  color: #f48982;
  cursor: pointer;
  font-size: 19px;
`;

export const AddRecipe = () => {
  const { isModalOpen, setIsModalOpen } = useContext(RecipeContext);
  const toggleModal = () => setIsModalOpen(true);

  return (
    <li>
      <button onClick={toggleModal} className={openModalBtn}>
        <FontAwesomeIcon className={plusIcon} icon={faCirclePlus} /> Add Recipe
      </button>
      {isModalOpen && <Modal closeModal={setIsModalOpen} />}
    </li>
  );
};
