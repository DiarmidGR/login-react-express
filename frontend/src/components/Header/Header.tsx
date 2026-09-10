import "./Header.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../SignoutButton/SignoutButton"


const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="header-title">
        <h1 onClick={handleHomeClick} title="Return to homepage">
          Login Template
        </h1>
      </div>
      
      <div className="header-logout">
        <SignoutButton label="Sign Out" />
      </div>
      
    </header>
  );
};

export default Header;
