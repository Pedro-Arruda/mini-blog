import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuth();
  return (
    <nav className="navbar navbar-dark navbar-expand bg-dark p-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <a href="#" className="navbar-brand">
            MINI <strong>BLOG</strong>
          </a>
          <div>
            <ul className="navbar-nav gap-3">
              <li className="nav-item ">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {!user && (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Registrar
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item">
                    <NavLink to="/usuario" className="nav-link">
                      Usuário
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  Sobre
                </NavLink>
              </li>
              {user && (
                <Button
                  onClick={logout}
                  variant="outline-danger"
                  className="px-3"
                >
                  Sair
                </Button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
