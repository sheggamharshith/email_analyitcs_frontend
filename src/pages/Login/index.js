import firebase from "firebase/app";
import app from "../../components/fireBase";
import "./index.scss";

import "shards-ui/dist/css/shards.min.css";
import GoogleButton from "../../components/googleButtom";
import { useUserDispatch } from "../../context/userContext";
import { loginSuccess, requestLogin } from "../../actions/userActions";

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
  return (
    <div className="login-main">
      <div
        onClick={() => {
          googleSignInPopup(dispatch);
        }}
      >
        <GoogleButton />
      </div>
    </div>
  );
};

export default LoginPage;
