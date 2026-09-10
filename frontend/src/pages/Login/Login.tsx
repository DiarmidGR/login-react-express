import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterModal from "./RegisterModal";
import CheckboxComponent from "../../components/Checkbox/Checkbox";
import {setToken} from "../../utils/Auth";

const Login: React.FC = () => {
  // Get username from remembered_username if available, initialize empty otherwise. 
  const [username, setUsername] = useState(() => localStorage.getItem("remembered_username") || "");
  const [password, setPassword] = useState("");
  // Get rememberUser from localStorage if available, initialize false otherwise.
  const [rememberUser, setRememberUser] = useState(() => localStorage.getItem("remembered_username") !== null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/login`,
        { username, password },
        { withCredentials: true }
      );
      setToken(res.data.accessToken);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("username", username);

      if (rememberUser) {
        localStorage.setItem("remembered_username", username);
      } else {
        localStorage.removeItem("remembered_username");
      }

      navigate("/");
    } catch (err: any) {

      // Change the console.log lines to whatever, react-hot-toast is a nice option.
      switch(err.response?.status) {
        case 401:
          console.log("Invalid username or password.");
          break;
        case 429:
          console.log("Too many login attempts. Please try again later.");
          break;
        default:
          console.log("An error occurred during login.");
      }
    }
  };

  return (
    <div className="login-layout">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-header switzer-bold">Login to Your Account</h1>
            <input
              type="text"
              className="login-input switzer-regular"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
            <input
              type="password"
              className="login-input switzer-regular"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          <div className="remember-row login-child">
            <CheckboxComponent
              isChecked={rememberUser}
              setIsChecked={setRememberUser}
            />
            <label className="remember-label switzer-regular">Remember this user</label>
          </div>
          <button type="submit" className="login-button switzer-bold">Sign In</button>
        </form>
      </div>
      <div className="register-container">
        <button className="switzer-bold" onClick={() => setIsRegisterOpen(true)}>Register User</button>
        <button className="guest-button switzer-bold" onClick={() => navigate("/")}>Continue as Guest</button>
      </div>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};
export default Login;
