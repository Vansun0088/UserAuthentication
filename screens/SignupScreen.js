import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isError, setIsError] = useState(false);
  const authCtx = useContext(AuthContext);

  function errorHandler() {
    setIsError(false);
  }

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      setIsError(true);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  if (isError) {
    <ErrorOverlay onPress={errorHandler} message="Check your fields or try again later" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
