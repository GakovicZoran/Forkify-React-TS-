import { css } from "@emotion/css";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../../Body/ForkifyContainer";
import { db } from "../../Helpers/firebaseConfig";
import { IRecipe } from "../../Helpers/Interfaces";

const configBox = css`
  width: 70%;
  background-color: #f9f5f3;
  text-align: center;

  & h3 {
    font-size: 30px;
    color: #6b6b6b;
    font-weight: normal;
    margin: 60px 0 0 0;
  }
  & form {
    width: 40%;
    margin: 0 auto;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
  }

  & input {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 18px;
    padding: 12px 15px;
    transition: all 0.2s;
    transition: all 0.2s;
    margin-bottom: 30px;
  }
`;

const handleSubmitConfig = css`
  & button {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    border: none;
    border-radius: 100px;
    color: #fff;
    text-transform: uppercase;
    transition: all 0.2s;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const handleDeleteConfig = css`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-right: 40px;
  & button {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    border: none;
    border-radius: 100px;
    color: #fff;
    transition: all 0.2s;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const errors = css`
  color: #dd5555;
  font-weight: bold;
  text-decoration: underline;
`;

export const ConfigInputs = () => {
  const [publisher, setPublisher] = useState<string>("");
  const [servings, setServings] = useState<number | null>(null);
  const [emptyErr, setEmptyErr] = useState<boolean>(false);
  const [deleteErr, setDeleteErr] = useState<boolean>(false);
  const [submitErr, setSubmitErr] = useState<boolean>(false);
  const { config } = useContext(RecipeContext);
  const navigate = useNavigate();
  const configCollectionRef = db.collection("config");

  const handlePublisher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublisher(e.target.value);
  };

  const handleServings = (e: React.BaseSyntheticEvent) => {
    setServings(e.target.value);
  };

  // Add CONFIG //
  const handleConfig = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = await getDocs(configCollectionRef);

    if (data.docs.length < 1) {
      try {
        await db.collection("config").add({
          publisher: publisher,
          servings: servings,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      return setSubmitErr(true);
    }
    navigate("/");
  };

  // Delete config from firebase //
  const deleteConfig = async (id: string) => {
    const configDoc = doc(db, "config", id);
    try {
      await deleteDoc(configDoc);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBtn = async () => {
    const data = await getDocs(configCollectionRef);
    if (data.docs.length !== 0) {
      deleteConfig(matchID[0]);
      setDeleteErr(true);
    } else {
      setEmptyErr(true);
      setDeleteErr(false);
    }
  };

  const matchID = config.map((conf: IRecipe) => {
    return conf.id;
  });

  const blur = () => {
    setEmptyErr(false);
    setDeleteErr(false);
  };

  return (
    <div className={configBox}>
      <h3>Configuration</h3>

      <form onSubmit={handleConfig}>
        <input
          type="text"
          onChange={handlePublisher}
          onBlur={blur}
          placeholder="Publisher"
          required
        ></input>
        <input
          type="number"
          onChange={handleServings}
          placeholder="Servings"
          required
        ></input>
        <div className={handleSubmitConfig}>
          <button>Submit</button>
          {submitErr && <p className={errors}>Please DELETE Previous CONFIG</p>}
        </div>
      </form>
      <div className={handleDeleteConfig}>
        <button onClick={handleDeleteBtn}>Delete Previous CONFIG</button>
        {emptyErr && <p className={errors}>Nothing to delete!</p>}
        {deleteErr && <p className={errors}>Deleted successfully!</p>}
      </div>
    </div>
  );
};
