import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUpdateDocument } from "../hooks/useUpdateDocuments";
import { useAuthValue } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Toast, Spinner } from "react-bootstrap";
import { useParams } from "react-router";

export const EditPost = () => {
  const [fields, setFields] = useState({
    titulo: "",
    imagem: "",
    conteudo: "",
    tags: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!fields.titulo || !fields.imagem || !fields.conteudo || !fields.tags) {
      setError("Por Favor, preencha todos os dados");
      console.log(error);
      return;
    }
    const tagsArray = fields.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    const data = {
      title: fields.titulo,
      image: fields.imagem,
      body: fields.conteudo,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(params.id, data);

    if (error !== "") return;

    navigate("/usuario");
  };
  return (
    <div className="mt-4 p-3">
      <h1>Editar Post</h1>
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

        <div className="d-flex justify-content-end gap-4">
          {!response.loading && (
            <>
              <Link to="/usuario">
                <Button className="mt-4 px-5" variant="outline-danger">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" className="mt-4 px-5">
                Editar
              </Button>
            </>
          )}

          {response.loading && (
            <Button type="submit" disabled className="mt-4 px-5 px-4">
              <Spinner animation="border" size="sm" role="status" />
              <span className="p-2">Editando Post...</span>
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
