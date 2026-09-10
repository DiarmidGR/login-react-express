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
    <>
      <div className="login-container flex h-full justify-center items-center text-center">
        <form onSubmit={handleLogin}>
          <h1 className="login-header switzer-bold text-5xl mb-4">Login</h1>
            <div className="flex flex-col">
              <input
                type="text"
                className="login-input switzer-regular mb-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
              <input
                type="password"
                className="login-input switzer-regular mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
          <div className="flex mb-4 items-center justify-center">
            <CheckboxComponent
              isChecked={rememberUser}
              setIsChecked={setRememberUser}
            />
            <label className="remember-label switzer-regular ml-2">Remember this user</label>
          </div>

          <div className="flex flex-col">
            <button type="submit" className="login-button switzer-bold mb-2">Sign In</button>
            <button className="login-button switzer-bold mb-2" onClick={() => setIsRegisterOpen(true)}>Register User</button>
            <button className="login-button switzer-bold" onClick={() => navigate("/")}>Continue as Guest</button>
          </div>

        </form>
        
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
      </div>
    </>
  );
};
export default Login;
