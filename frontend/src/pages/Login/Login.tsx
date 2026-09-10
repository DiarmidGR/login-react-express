import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, {Toaster, useToasterStore} from "react-hot-toast";
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

  // Limit the number of visible toasts to 1 (To limit spam issue i had before.)
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts.filter((t) => t.visible).filter((_, i) => i >= TOAST_LIMIT).forEach((t) => toast.remove(t.id));
  }, [toasts]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('message') === 'refresh-error') {
      toast.error('Session expired. Login to continue.');
    }
  }, []);

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
    } catch (err) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="login-layout">
      <Toaster />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-header switzer-bold">Login to Your Account</h1>
          <h3 className="login-subheader switzer-regular">Login to track user progress.</h3>
          <label htmlFor="" className="login-child">
            <input
              type="text"
              className="login-input switzer-regular"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </label>
          <label htmlFor="" className="login-child">
            <input
              type="password"
              className="login-input switzer-regular"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
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
        <h1 className="switzer-bold">No account?</h1>
        <p className="register-message switzer-regular">To track across multiple devices:</p>
        <button className="switzer-bold" onClick={() => setIsRegisterOpen(true)}>Register User</button>
        <p className="register-message switzer-regular">To track on this device only:</p>
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
