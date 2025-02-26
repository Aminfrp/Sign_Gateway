import { useEffect } from "react";

export const useAutoLogin = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
      if (!code) return;
      //   const sign = getSignContentWithSession();
      //   debugger;
      //   getAutoLoginToken(code, setToken).then((r) => navigate(`/?sign=${sign}`));
      console.log(code)
  }, []);
};
