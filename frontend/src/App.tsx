import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <div className="app-wrapper w-full">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
