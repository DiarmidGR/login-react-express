import { useState } from "react";
import axios from "axios";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/register`, {
        username,
        password,
      }, { withCredentials: true });
      console.log("Account created! You can now log in.");
      handleClose();
    } catch (err) {
      console.error("Registration failed. Try a different username.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex fixed inset-0 justify-center items-center bg-black/50" onClick={handleClose}>
      <div
        className="modal-content bg-(--secondary-dark) rounded-lg p-6 max-w-420 w-90 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-3 right-4 text-xl cursor-pointer text-(--secondary-lighter) 
          hover:text-(--primary-color) transition-all duration-300" onClick={handleClose}>
          x
        </button>

        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-header switzer-bold text-4xl mb-2">Create an Account</h1>
          <h3 className="login-subheader switzer-regular text-xl mb-4">Register to get started</h3>

          <label htmlFor="" className="login-child">
            <input
              type="text"
              className="login-input switzer-regular mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </label>

          <label htmlFor="" className="login-child">
            <input
              type="password"
              className="login-input switzer-regular mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>

          <label htmlFor="" className="login-child">
            <input
              type="password"
              className="login-input switzer-regular mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
          </label>

          <button type="submit" className="login-button switzer-bold" disabled={isSubmitting}>
            {"Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;