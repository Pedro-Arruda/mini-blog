import { Badge } from "react-bootstrap";

export const CardPost = ({ image, title, body, tags, createdBy }) => {
  return (
    <>
      <div className="card" style={{ width: 20 + "rem" }}>
        <img
          src={image}
          alt="imagem do post"
          className="card-img-top"
          style={{ height: 14 + "rem" }}
        />
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="card-text">{body}</p>
          <div className="d-flex gap-2 flex-wrap">
            {tags.map((tag, index) => {
              return (
                <Badge pill className="p-2" bg="dark" key={index}>
                  {tag}
                </Badge>
              );
            })}
          </div>

          <p className=" mt-3">{createdBy}</p>
        </div>
      </div>
    </>
  );
};
