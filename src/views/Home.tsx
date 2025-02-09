import withAuth from "@/HOC/AuthHOC";
import { HomeFeature } from "../features";

export const Home = () => {
  return (
    <div className="container mx-auto flex-1 flex flex-col">
      <HomeFeature />
    </div>
  );
};

export default withAuth(Home);
