import { useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import { useDeleteDocument } from "../hooks/useDeleteDocuments";

import { makePostResume } from "../functions/makePostResume";

export const CardPost = ({ post, isEditable }) => {
  const { deleteDocument } = useDeleteDocument("posts");
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <button
      className="border-0 bg-transparent h-100"
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
    >
      <div
        className={[
          "card position-relative d-flex flex-column justify-content-center",
          hover & isEditable ? "opacity-25 bg-dark" : "",
        ].join(" ")}
        style={{ width: "23rem", height: "40rem" }}
      >
        <img
          src={post.image}
          alt="imagem do post"
          className="card-img-top"
          style={{ height: "17rem" }}
        />

        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{makePostResume(post.body, 330)}</p>
          <div className="d-flex gap-2 flex-wrap">
            {post.tags.map((tag, index) => {
              return (
                <Badge pill className="p-2" bg="dark" key={index}>
                  {tag}
                </Badge>
              );
            })}
          </div>

          <p className=" mt-3">{post.createdBy}</p>
        </div>

        <div
          className={[
            "position-absolute d-flex gap-5 justify-content-center w-100 ",
            hover & isEditable ? "opacity-100" : "opacity-0",
          ].join(" ")}
          size={45}
          style={{ zIndex: 10 }}
        >
          <Link to={`/posts/${post.id}/edit`}>
            <BsFillPencilFill size={45} color={"#fff"} />
          </Link>
          <BsTrash
            size={45}
            color={"#fff"}
            onClick={() => {
              setShowModal(true);
            }}
          />

          <Modal show={showModal}>
            <Modal.Header>
              <Modal.Title>Atenção!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir o post?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Voltar
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteDocument(post.id);
                }}
              >
                Excluir Post
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </button>
  );
};
