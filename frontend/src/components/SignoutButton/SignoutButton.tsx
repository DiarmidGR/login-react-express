import "./SignoutButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import {logoutUser} from "../../utils/Auth";

// Define the interface for the props
interface SignoutButtonProps {
  label?: string;
}

const SignoutButton: React.FC<SignoutButtonProps> = ({ label }) => {
  return (
    <button onClick={logoutUser} className="signout-button switzer-regular">
      <FontAwesomeIcon icon={faSignOut} />
      {label && <span>{label}</span>}
    </button>
  );
};

export default SignoutButton;
