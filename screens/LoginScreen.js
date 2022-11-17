import { useState, useContext } from "react";

import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isError, setIsError] = useState(false);
  const authCtx = useContext(AuthContext);

  function errorHandler() {
    setIsError(false);
  }

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      setIsError(true);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging user..."} />;
  }

  if (isError) {
    return <ErrorOverlay onPress={errorHandler} message="Check your fields or try again later" />;
  }

  return <AuthContent onAuthenticate={loginHandler} isLogin />;
}

export default LoginScreen;
