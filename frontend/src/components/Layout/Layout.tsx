import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const currentYear = new Date().getFullYear(); // Get the current year dynamically

const Layout: React.FC = () => {

  return (
    <div className="layout-wrapper">
      <div className="layout-header layout-child switzer-bold">
        <Header />
      </div>
      <div className="layout-content layout-child">
        <Outlet />
      </div>
      <div className="layout-footer layout-child switzer-bold">
        © Copyright {currentYear} Diarmid Rendell. All rights reserved.
        <a href="https://github.com/DiarmidGR/login-react-express" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github.svg" alt="GitHub" className="github-link" />
        </a>
      </div>
    </div>
  );
};

export default Layout;
