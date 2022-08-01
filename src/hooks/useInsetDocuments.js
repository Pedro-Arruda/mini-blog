import { async } from "@firebase/util";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useReducer, useState } from "react";

const inicialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOCUMENT":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docColection) => {
  const [response, dispatch] = useReducer(insertReducer, inicialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
      payload: insertDocument,
    });
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docColection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOCUMENT",
        payload: insertDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { insertDocument, response };
};
