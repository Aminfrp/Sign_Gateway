import { ROUTES } from "@/constants";
import withAuth from "@/HOC/AuthHOC";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useNavigate } from "react-router";
import { HomeFeature } from "../features";

export const Home = () => {
  const [contract] = useSessionStorage("CONTRACT");

  if (!contract) {
    window.location.href = `${ROUTES.NOT_FOUND}`;
  }
  return (
    <div className="container mx-auto flex-1 flex flex-col">
      <HomeFeature />
    </div>
  );
};

export default withAuth(Home);
