import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useInsertDocument } from "../hooks/useInsetDocuments";
import { useAuthValue } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toast, Spinner } from "react-bootstrap";

export const CreatePost = () => {
  const [fields, setFields] = useState({
    titulo: "",
    imagem: "",
    conteudo: "",
    tags: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const tagsArray = fields.tags;

    if (!fields.titulo || !fields.imagem || !fields.conteudo || !fields.tags) {
      setError("Por Favor, preencha todos os dados");
    }
    insertDocument({
      title: fields.titulo,
      image: fields.imagem,
      body: fields.conteudo,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    console.log(
      {
        title: fields.titulo,
        image: fields.imagem,
        body: fields.conteudo,
        tags: tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      },
      error
    );

    if (error !== "") return;

    navigate("/");
  };
  return (
    <div className="mt-4 p-3">
      <h1>Criar Post</h1>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>Titulo:</strong>
          </Form.Label>
          <Form.Control
            value={fields.titulo}
            onChange={(e) => {
              setFields({ ...fields, titulo: e.target.value });
            }}
            type="text"
            className="input w-100"
            placeholder="Pense em um bom título..."
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>URL da Imagem:</strong>
          </Form.Label>
          <Form.Control
            value={fields.imagem}
            onChange={(e) => {
              setFields({ ...fields, imagem: e.target.value });
            }}
            type="URL"
            className="input"
            placeholder="Insira uma imagem que represente seu post"
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>Conteúdo</strong>
          </Form.Label>
          <Form.Control
            value={fields.conteudo}
            onChange={(e) => {
              setFields({ ...fields, conteudo: e.target.value });
            }}
            type="text"
            className="input"
            placeholder="Insira o conteúdo do post"
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <strong>Tags:</strong>
          </Form.Label>
          <Form.Control
            value={fields.tags}
            onChange={(e) => {
              setFields({ ...fields, tags: e.target.value });
            }}
            type="text"
            className="input"
            placeholder="Insira as tags separadas por vírgula"
          />
        </Form.Group>
        {error && (
          <div className="d-flex justify-content-center">
            <Toast bg="danger" className="text-white mt-4 text-center">
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          </div>
        )}

        <div className="d-flex justify-content-end">
          {!response.loading && (
            <Button type="submit" className="mt-4 px-5">
              Cadastrar
            </Button>
          )}

          {response.loading && (
            <>
              <Button type="submit" disabled className="mt-4 px-5 px-4">
                <Spinner animation="border" size="sm" role="status" />
                <span className="p-2">Criando Post...</span>
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};
