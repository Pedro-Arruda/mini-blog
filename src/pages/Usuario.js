import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CardPost } from "../components/CardPost";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

export const Usuario = () => {
  const { auth } = useAuth();
  const { documents: posts, loading } = useFetchDocuments("posts");
  const [isEditable, setIsEditable] = useState(false);

  console.log(auth.currentUser.displayName);

  return (
    <>
      <div className="d-flex py-5 align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <h1>{auth.currentUser.displayName}</h1>
          <p className="w-75">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore et
            sed omnis maiores optio amet, saepe dolore maxime. Sed vero velit
            officia. Ab optio libero reiciendis molestiae, doloribus repellat
            obcaecati?
          </p>
        </div>

        <label
          className="outline-light d-flex flex-column align-items-center justify-content-center position-relative pe-auto"
          onMouseEnter={() => setIsEditable(true)}
          onMouseLeave={() => setIsEditable(false)}
          htmlFor="input-img"
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://source.unsplash.com/random/10×10"
            width={150}
            height={150}
            className={["rounded-circle", isEditable ? "opacity-50" : ""].join(
              " "
            )}
            alt="img do usuario"
          />
          <BsFillPencilFill
            className={[
              "position-absolute",
              isEditable ? "opacity-100" : "opacity-0",
            ].join(" ")}
            size={30}
            color="#fff"
          />
          <input type="file" className="d-none" id="input-img" />
        </label>
      </div>
      <div className="d-flex justify-content-between py-5">
        <h1>Últimos Posts</h1>
        <NavLink to={"/posts/create"}>
          <Button variant="dark" className="px-4">
            Novo Post
          </Button>
        </NavLink>
      </div>
      <div className="d-flex flex-wrap gap-5 justify-content-center">
        {posts &&
          posts.map((post, index) => {
            if (post.createdBy === auth.currentUser.displayName) {
              return (
                <CardPost
                  key={index}
                  body={post.body}
                  title={post.title}
                  createdBy={post.createdBy}
                  image={post.image}
                  tags={post.tags}
                />
              );
            }
          })}
      </div>
    </>
  );
};
