import "./Home.css";
import { getUsername, isAuthenticated } from "../../utils/Auth";

const Home: React.FC = () => {
  return (
    <div className="home-layout">
      <div className="home-container">
        {isAuthenticated() ? <p>Logged in: {getUsername()}</p> : <p>Not logged in</p>}
      </div>
    </div>
  );
};

export default Home;
