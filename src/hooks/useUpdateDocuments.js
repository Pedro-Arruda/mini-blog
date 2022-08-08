import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { useReducer, useState } from "react";

const inicialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docColection) => {
  const [response, dispatch] = useReducer(updateReducer, inicialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid, data) => {
    console.log("ID DO POST", uid);
    console.log("DATA", data);
    checkCancelBeforeDispatch({
      type: "LOADING",
      payload: updateDocument,
    });

    try {
      const docRef = await doc(db, docColection, uid);

      console.log("try");

      const updatedDocument = await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      console.log("fim do try");
    } catch (error) {
      console.log("etrou no erro", error);
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { updateDocument, response };
};
