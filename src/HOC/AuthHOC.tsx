import { getCodeParam } from "@/lib/utils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const checkAuth = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!checkAuth() && !getCodeParam()) {
        navigate("/auth/login", { replace: true });
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
