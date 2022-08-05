import { Toast, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const Register = () => {
  const [fields, setFields] = useState({
    nome: "",
    email: "",
    senha: "",
    repetirSenha: "",
  });

  const [erros, setErros] = useState(null);
  const { createUser, error: AuthError, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErros("");

    const user = {
      nome: fields.nome,
      email: fields.email,
      password: fields.senha,
    };

    if (fields.senha !== fields.repetirSenha) {
      setErros("As senhas são diferentes!");
      return;
    }

    const response = await createUser(user);
  };

  useEffect(() => {
    if (AuthError) {
      setErros(AuthError);
    }
  }, [AuthError]);

  return (
    <div className="p-5">
      <h1>Cadastre-se para postar</h1>
      <p className="mt-2">Crie seu usuário e compartilhe suas histórias</p>

      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>Nome</strong>
          </Form.Label>
          <Form.Control
            required
            className="input"
            value={fields.nome}
            onChange={(e) => setFields({ ...fields, nome: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>E-mail</strong>
          </Form.Label>
          <Form.Control
            required
            className="input"
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>Senha</strong>
          </Form.Label>
          <Form.Control
            required
            className="input"
            value={fields.senha}
            type="password"
            onChange={(e) => setFields({ ...fields, senha: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>Repetir Senha</strong>
          </Form.Label>
          <Form.Control
            required
            type="password"
            className="input"
            value={fields.repetirSenha}
            onChange={(e) =>
              setFields({ ...fields, repetirSenha: e.target.value })
            }
          />
        </Form.Group>
        {erros && (
          <div className="d-flex justify-content-center">
            <Toast bg="danger" className="text-white mt-4 text-center">
              <Toast.Body>{erros}</Toast.Body>
            </Toast>
          </div>
        )}

        <div className="d-flex justify-content-end">
          {!isLoading && (
            <Button type="submit" className="mt-4 px-5">
              Cadastrar
            </Button>
          )}

          {isLoading && (
            <>
              <Button type="submit" disabled className="mt-4 px-5 px-4">
                <Spinner animation="border" size="sm" role="status" />
                <span className="p-2">Cadastrar</span>
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};
