import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const currentYear = new Date().getFullYear(); // Get the current year dynamically

const Layout: React.FC = () => {

  return (
    <div className="layout-wrapper flex flex-col w-full min-h-screen bg-(--secondary-dark) text-(--primary-color)">
      <div className="layout-header layout-child switzer-bold">
        <Header />
      </div>
      <div className="layout-content flex flex-grow">
        <Outlet />
      </div>
      <div className="layout-footer switzer-bold text-center p-4 flex items-center justify-center">
        © Copyright {currentYear} Diarmid Rendell. All rights reserved.
        <a href="https://github.com/DiarmidGR/login-react-express" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github.svg" alt="GitHub" className="github-link ml-4 align-middle size-8" />
        </a>
      </div>
    </div>
  );
};

export default Layout;
