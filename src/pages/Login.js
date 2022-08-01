import { Toast, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [fields, setFields] = useState({
    senha: "",
    email: "",
  });

  const [erros, setErros] = useState(null);
  const { login, error: AuthError, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErros("");

    const user = {
      password: fields.senha,
      email: fields.email,
    };

    const response = await login(user);
  };

  useEffect(() => {
    if (AuthError) {
      setErros(AuthError);
    }
  }, [AuthError]);
  return (
    <div className="p-5">
      <h1>Entrar</h1>
      <p className="mt-2">Faça o login para poder utilizar o sistema</p>

      <Form className="mt-4" onSubmit={handleSubmit}>
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
              Entrar
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
