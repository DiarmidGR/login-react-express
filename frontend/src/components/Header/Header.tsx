import React from "react";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../SignoutButton/SignoutButton"

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="items-center justify-center flex flex-col shadow-[0px_14px_28px_rgba(0,0,0,0.25),_0px_10px_10px_rgba(0,0,0,0.22)] text-(--third-light) bg-(--primary-color) p-4 text-3xl md:flex-row">
      <div className="header-title">
        <h1 onClick={handleHomeClick} title="Return to homepage" 
        className="cursor-pointer transition-colors duration-200 hover:text-(--third-dark)">
          Login Template
        </h1>
      </div>
      
      <div className="header-logout relative md:left-4 md:absolute p-0">
        <SignoutButton label="Sign Out" />
        
      </div>
      
    </header>
  );
};

export default Header;

