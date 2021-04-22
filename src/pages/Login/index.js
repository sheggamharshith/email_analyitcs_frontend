import {
  useUserDispatch,
  useUserState,
  loginUserUsingFireBase,
} from "../../context/userContext";
import LoginCard from "../../components/LoginCard";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useUserDispatch();
  const user = useUserState();

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard/main" />;
  }
  return (
    <div className="flex justify-center h-screen border border-blue-600 items-center login-main  ">
      <LoginCard loginfunction={loginUserUsingFireBase} dispatch={dispatch} />
    </div>
  );
};

export default LoginPage;
