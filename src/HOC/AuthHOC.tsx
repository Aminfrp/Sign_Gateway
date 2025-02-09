import React, { useEffect } from "react";
import { useNavigate } from "react-router";

// Function to check authentication based on localStorage token
const checkAuth = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
      if (!checkAuth()) {
        navigate("/auth/login", { replace: true });
      }
    }, []);

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
