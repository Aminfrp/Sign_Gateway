import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { AuthLayout } from "@/components/layouts/auth/AuthLayout";
import { ROUTES } from "@/constants";
import { useGetContractContent } from "@/hooks/useGetContractContent";
import { NotFound } from "@/views/NotFound";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "../components";

const Login = lazy(() => import("@/views/Login"));
const OTP = lazy(() => import("@/views/OTP"));
const Contract = lazy(() => import("@/views/Contract"));
const Contracts = lazy(() => import("@/views/Contracts"));
const SignFailedFeature = lazy(() => import("@/views/SignFailedFeature"));
const SignSuccessFeature = lazy(() => import("@/views/SignSuccessFeature"));
const ContractsSignSuccessFeature = lazy(() => import("@/views/ContractsSignSuccessFeature"));
const ContractsFailedFeature = lazy(() => import("@/views/ContractsSignFailedFeature"));

const Router = () => {
  // useEffect(() => {
  //   const clearLocalStorage = () => {
  //     localStorage.clear();
  //   };
  //   window.addEventListener("beforeunload", clearLocalStorage);
  //   return () => {
  //     window.removeEventListener("beforeunload", clearLocalStorage);
  //   };
  // }, []);
  const { appLoading, contract } = useGetContractContent();

  if (appLoading) return <FullPageLoading />;

  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          <Route path={ROUTES.CONTRACT} element={<Layout />}>
            <Route path={ROUTES.CONTRACTS} element={<Contracts />} />
            <Route path={ROUTES.CONTRACT} element={<Contract />} />
            <Route path={ROUTES.UNSUCCESSFUL} element={<SignFailedFeature />} />
            <Route path={ROUTES.SUCCESSFUL} element={<SignSuccessFeature />} />
            <Route path={ROUTES.CONTRACTS_SUCCESSFUL} element={<ContractsSignSuccessFeature />} />
            <Route path={ROUTES.CONTRACTS_SUCCESSFUL} element={<ContractsFailedFeature />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>
          <Route path={ROUTES.AUTH} element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.OTP} element={<OTP />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={ROUTES.NOT_FOUND} replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
