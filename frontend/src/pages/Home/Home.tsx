import { getUsername, isAuthenticated } from "../../utils/Auth";

const Home: React.FC = () => {
  return (
    <div className="home-layout flex flex-col w-full">
      <div className="home-container flex text-[var(--third-color)] justify-center items-center h-full">
        {isAuthenticated() ? <p>Logged in: {getUsername()}</p> : <p>Not logged in</p>}
      </div>
    </div>
  );
};

export default Home;
