import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "./util/auth";
import "./App.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) navigate("/dashboard");
    else navigate("/login");
  });

  return <div></div>;
}

export default App;
