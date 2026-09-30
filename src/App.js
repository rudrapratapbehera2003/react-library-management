import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
      <Router> 
         <Navbar />
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />}/>

      </Routes>
      </Router>
  );
}

export default App;
