import firebase from "firebase/app";
import app from "../../components/fireBase";
import "./index.scss";

import { useUserDispatch, useUserState } from "../../context/userContext";
import { loginSuccess, requestLogin } from "../../actions/userActions";
import LoginCard from "../../components/LoginCard";
import { Redirect } from "react-router-dom";

function googleSignInPopup(dispatch) {
  dispatch(requestLogin());
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://mail.google.com/");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      dispatch(loginSuccess());
      console.log(result);
      localStorage.setItem("token", result.credential.idToken);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

const LoginPage = () => {
  const dispatch = useUserDispatch();
  const user = useUserState();

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard/main" />;
  }
  return (
    <div className="flex justify-center h-screen border border-blue-600 items-center login-main  ">
      <LoginCard loginfunction={googleSignInPopup} dispatch={dispatch} />
    </div>
  );
};

export default LoginPage;
