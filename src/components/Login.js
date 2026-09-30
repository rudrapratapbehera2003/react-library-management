import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);


const handleSubmit =  async (e) =>{
  e.preventDefault();
  if (username === "" || password === "") {
    setError("Username and Password cannot be empty");
    return;
  }
  try{
    const response = await axios.post("http://localhost:8080/student/login", {
      username,
      password
    });
    if(response.data){
      const token = response.data;
      localStorage.setItem("token",token);
      setError(null);
      window.location.href = "/"; 
    }
  } catch(erroe){
    console.error("Login failed", error);
    setError("Login failed. Please try again.");
  }


}


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ width: "30rem", height: "30rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-5">Students Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
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
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
            New User?
            <Link to="/register">Click Here To Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
