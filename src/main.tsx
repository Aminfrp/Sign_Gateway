import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Router from "./router";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Router />
    <ToastContainer
      stacked={true}
      autoClose={2000}
      position="bottom-right"
      rtl={true}
      toastStyle={{
        fontFamily: "Yekan_Regular !important",
      }}
      style={{
        fontFamily: "Yekan_Regular !important",
      }}
    />
  </QueryClientProvider>
);
