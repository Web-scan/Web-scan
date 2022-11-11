import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Logo() {
  const navigate = useNavigate();

  return <img src={logo} alt="logo" onClick={() => navigate("/")} />;
}
