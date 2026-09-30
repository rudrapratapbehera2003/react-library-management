import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || rollNo === "" || password === "") {
      setError("All fields are required");
      return;
    }
    try {
      await axios.post("http://localhost:8080/student/register", {
        name,
        rollNo,
        password,
      });
      setError(null);
      alert("Registration successful");
      window.location.href = "/login";
    } catch (error) {
      setError("Registraion failed. Please try again.");
      console.error("Registraion failed", error);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mt-5">
      <div
        className="card p-4 shadow"
        style={{ width: "40rem", height: "38rem" }}
      >
        <h2 className="text-center mb-4"> Students Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter your Username
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter your Roll No
            </label>
            <input
              type="text"
              id="password"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="form-control"
              placeholder="Enter roll no"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter Your Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>
         <label htmlFor="role" className="form-label">
          Role
         </label>
          <div class="dropdown mb-5">
            <input
              type="text"
              className="form-control dropdown-toggle"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              readonly
              placeholder="Chosse from the dropdown"
            />
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a className="dropdown-item" href="/">
                  STUDENT
                </a>
              </li>
            </ul>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Already Registered?
            <Link to="/login">Click Here To Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
