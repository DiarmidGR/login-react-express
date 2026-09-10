import "./SignoutButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the interface for the props
interface SignoutButtonProps {
  label?: string;
}

const SignoutButton: React.FC<SignoutButtonProps> = ({ label }) => {
  let navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("remembered_username");
    navigate("/login");
  };

  return (
    <button onClick={handleSignOut} className="signout-button switzer-regular">
      <FontAwesomeIcon icon={faSignOut} />
      {label && <span>{label}</span>}
    </button>
  );
};

export default SignoutButton;
