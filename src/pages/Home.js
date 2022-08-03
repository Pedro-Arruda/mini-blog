import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFetchDocuments } from "../hooks/useFetchDocuments";

export const Home = () => {
  const [fieldSearch, setFieldSearch] = useState("");

  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(posts);

  return (
    <div className="d-flex justify-content-center align-items-center gap-3 flex-column mt-4 p-3 ">
      <h1>Veja nossos posts mais recentes</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="search"
              className="input py-2"
              value={fieldSearch}
              onChange={(e) => setFieldSearch(e.target.value)}
              placeholder="Busque por tags"
            />
          </Col>
          <Col>
            <Button variant="dark" className="py-2 px-4" type="submit">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-center w-75 gap-5 mt-4">
        {posts &&
          posts.map((post) => {
            return (
              <div className="d-flex flex-column w-25 card p-3 pe-auto">
                <h2 className="h-25">{post.title}</h2>
                <img
                  src={post.image}
                  alt="imagem do post"
                  className="h-50"
                ></img>
                <p>{post.body}</p>
                <div className="d-flex gap-2">
                  {post.tags.map((tag) => {
                    return (
                      <Badge pill className="p-2" bg="dark">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {!posts && (
          <div className="d-flex flex-column gap-2 mt-4">
            <p>Não foram encontrados posts</p>
            <NavLink
              to="/posts/create"
              className="text-decoration-none text-white btn btn-dark px-5"
            >
              Criar primeiro post
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
