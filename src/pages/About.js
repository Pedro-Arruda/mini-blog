import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="d-flex flex-column align-items-center h-100 justify-content-center p-5 gap-3">
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no front-end e Firebase
        no back-end.
      </p>
      <Link
        to="/posts/create"
        className="text-decoration-none text-white btn btn-dark px-5"
      >
        Criar post
      </Link>
    </div>
  );
};
