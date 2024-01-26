import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Auth} from "./utils/auth";
import "./App.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth.isAuthenticated()) navigate("shopping-cart-admin-panel/dashboard");
    else navigate("shopping-cart-admin-panel/login");
  });

  return <div></div>;
}

export default App;
