import { css } from "@emotion/css";
import { db } from "../../Helpers/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { RecipeContext } from "../../Body/ForkifyContainer";
import { IRecipe } from "../../Helpers/Interfaces";

const modalBackground = css`
backdrop-filter: blur(4px);
background-color: rgba(0,0,0,.4);
height: 100%;
left: 0;
position: fixed;
top: 0;
transition: all .5s;
width: 100%;
z-index: 100;
}

& h3 {
  color: #6b6b6b;
}
`;

const modalContainer = css`
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 40px 60px rgb(0 0 0 / 25%);
  left: 50%;
  padding: 40px 100px 90px 100px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
  width: 40vw;
  z-index: 1000;
  position: relative;

  & button {
    text-align: center;
  }
`;

const btnCloseModal = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  right: 10px;
  top: 3px;
  gap: 50px;
`;

const upload = css`
  display: flex;
  justify-content: center;
  gap: 90px;

  & label {
    width: 100px;
    display: inline-block;
    margin: 4px;
  }

  & input {
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 18px;
    padding: 12px 15px;
    transition: all 0.2s;
    width: 110%;
  }

  & p {
    margin: 0;
    color: red;
  }
`;

const btnUpload = css`
  position: absolute;
  bottom: 0;
  font-size: 18px;
  font-weight: 600;
  padding: 14px 40px;

  & button {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    border: none;
    border-radius: 100px;
    color: #fff;
    display: flex;
    text-transform: uppercase;
    transition: all 0.2s;
    padding: 20px 50px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }

  & button:disabled,
  button:disabled:hover,
  button:disabled:active {
    cursor: not-allowed;
    color: red;
  }
`;

const alignLabel = css`
  display: flex;
  align-items: baseline;
  max-width: 100%;
  margin-bottom: 20px;
`;

const cloudIcon = css`
  margin-right: 10px;
  font-size: 17px;
`;

const ingredientsBox = css`
  max-width: 355px;
`;

const addIng = css`
  text-align: center;
  margin: 20px 0 0 50px;
  & button {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    border: none;
    border-radius: 100px;
    color: #fff;
    text-transform: uppercase;
    transition: all 0.2s;
    padding: 10px 30px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
`;

interface IModalProp {
  closeModal: (active: boolean) => void;
}

export const Modal = ({ closeModal }: IModalProp) => {
  const [moreIng, setMoreIng] = useState<object[]>([{}]);
  const { config, setConfig } = useContext(RecipeContext);
  const navigate = useNavigate();

  // Configuration //
  useEffect(() => {
    const configCollectionRef = db.collection("config");

    const getConfigInfo = async () => {
      try {
        const data = await getDocs(configCollectionRef);
        setConfig(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error(err);
      }
    };
    getConfigInfo();
  }, []);

  // Submit new recipe
  const submitRecipe = async (e: any) => {
    e.preventDefault();

    const dataArr = [...new FormData(e.target)];

    // Ingredients //
    const ingredients = dataArr
      .filter((ing: [string, FormDataEntryValue]) => {
        return ing[0].startsWith("ingredient") && ing[1] !== "";
      })
      .map((ing: any) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const objDataForm = Object.fromEntries(dataArr);

    try {
      await db.collection("recipes").add({
        title: objDataForm.title,
        image: objDataForm.image,
        publisher: objDataForm.publisher,
        cookingTime: +objDataForm.cookingTime,
        servings: +objDataForm.servings,
        ingredients,
      });
    } catch (err) {
      console.error(err);
    }
    closeModal(false);
    navigate("/");
  };

  const handleIngredientsAdd = () => {
    setMoreIng([...moreIng, { ing: "" }]);
  };

  //  config //
  const publisherConfig = config.map((conf: IRecipe) => {
    return conf.publisher;
  });

  const servingsConfig = config.map((conf: IRecipe) => {
    return conf.servings;
  });
  return (
    <div className={modalBackground}>
      <div className={modalContainer}>
        <button className={btnCloseModal} onClick={() => closeModal(false)}>
          x
        </button>
        <form onSubmit={submitRecipe} className={upload} id="resetFields">
          <div>
            <h3>RECIPE DATA</h3>
            <div className={alignLabel}>
              <div>
                <label>Title</label>
              </div>
              <div>
                <input type="text" name="title" required />
              </div>
            </div>

            <div className={alignLabel}>
              <div>
                <label>Image URL</label>
              </div>
              <div>
                <input type="text" name="image" required />
              </div>
            </div>
            <div className={alignLabel}>
              <div>
                <label>Publisher</label>
              </div>
              <div>
                <input
                  type="text"
                  name="publisher"
                  defaultValue={publisherConfig}
                  required
                />
              </div>
            </div>
            <div className={alignLabel}>
              <div>
                <label>Prep time</label>
              </div>
              <div>
                <input type="number" name="cookingTime" required />
              </div>
            </div>
            <div className={alignLabel}>
              <div>
                <label>Servings</label>
              </div>
              <div>
                <input
                  type="number"
                  name="servings"
                  defaultValue={servingsConfig}
                  required
                />
              </div>
            </div>
          </div>

          <div className={ingredientsBox}>
            <h3>INGREDIENTS</h3>
            <div className={alignLabel}>
              <div>
                <label>Ingredient 1</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Format: 'Quantity,Unit,Description'"
                  name="ingredient-1"
                  required
                />
              </div>
            </div>
            <div className={alignLabel}>
              <div>
                <label>Ingredient 2</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Format: 'Quantity,Unit,Description'"
                  name="ingredient-2"
                  required
                />
              </div>
            </div>

            <div className={alignLabel}>
              <div>
                <label>Ingredient 3</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Format: 'Quantity,Unit,Description'"
                  name="ingredient-3"
                />
              </div>
            </div>
            <div className={alignLabel}>
              <div>
                <label>Ingredient 4</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Format: 'Quantity,Unit,Description'"
                  name="ingredient-4"
                />
              </div>
            </div>
            {moreIng.map((_ing, i: number) => {
              return (
                <div className={alignLabel} key={i}>
                  <div>
                    <label>Ingredient {5 + i}</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      name="ingredient-5"
                    ></input>
                    {moreIng.length - 1 === i && moreIng.length < 10 && (
                      <div className={addIng}>
                        <button onClick={handleIngredientsAdd}>More..</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={btnUpload}>
            <button>
              <FontAwesomeIcon className={cloudIcon} icon={faCloudArrowUp} />
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
