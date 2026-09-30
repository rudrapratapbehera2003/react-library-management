import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from  "../context/AuthContext";

export default function Navbar() {

  const {username} = useContext(AuthContext);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "rgb(160 149 54)" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ fontSize: "1rem",border:"2px solid blue",padding:"0.2rem", borderRadius:"0.5rem" }}>
            Veda <img src={require("../library_icon.png")} alt="Logo"
            style={{width:"2rem", borderRadius:"50%",height:"1.5rem"}} />
            <br />Primodial
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/register"
                >
                  Register
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
              <img
                  src={require("../user.jpg")}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                  }}
                  alt="User"
                />

                </a>
                <ul className="dropdown-menu">
        
                  <li>
                    <a className="dropdown-item" href="/">
                     Welcome {username ? username : "User"}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                   your Chits
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "30rem", height: "2rem" }}
              />
              <button className="btn btn-outline-success bg-dark" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
