import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const createUser = async (data) => {
    checkIfIsCancelled();

    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.nome,
      });

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else if (error.message.includes("invalid")) {
        systemErrorMessage = "O e-mail não é válido.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setError(systemErrorMessage);
    }

    setIsLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();

    setIsLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsLoading(false);
    } catch (err) {
      let systemErrorMessage;
      if (err.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (err.message.includes("wrong-password")) {
        systemErrorMessage = "Senha Incorreta";
      } else if (err.message.includes("invalid")) {
        systemErrorMessage = "O e-mail não é válido.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setIsLoading(false);
      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    isLoading,
    logout,
    login,
  };
};
