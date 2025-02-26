import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { AuthLayout } from "@/components/layouts/auth/AuthLayout";
import { ROUTES } from "@/constants";
import { useAutoLogin } from "@/hooks";
import { useGetContractContent } from "@/hooks/useGetContractContent";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "../components";

const Login = lazy(() => import("@/views/Login"));
const OTP = lazy(() => import("@/views/OTP"));
const Home = lazy(() => import("@/views/Home"));

const Router = () => {
  const a = useGetContractContent();

  useAutoLogin();
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
          <Route path={ROUTES.AUTH} element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.OTP} element={<OTP />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
