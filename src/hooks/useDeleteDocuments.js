import { async } from "@firebase/util";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useReducer, useState } from "react";

const inicialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOCUMENT":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docColection) => {
  const [response, dispatch] = useReducer(deleteReducer, inicialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
      payload: deleteDocument,
    });
    try {
      const deletedDocument = await deleteDoc(doc(db, docColection, id));

      checkCancelBeforeDispatch({
        type: "DELETED_DOCUMENT",
        payload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { deleteDocument, response };
};
