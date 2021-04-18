import axios from "axios";
import React from "react";
import firebase from "firebase/app";
import app from "../components/fireBase";
import {
  requestLogin,
  loginSuccess,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/userActions";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

UserStateContext.displayName = "User";
UserDispatchContext.displayName = "userDispatch";

// will use the action and will
//directly replace the present state with action state
function userReducer(state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...action };
    case LOGIN_FAILURE:
      //backend server parsing the data with left over token
      axios.defaults.headers.common = null;
      return { ...action };
    case LOGOUT_REQUEST:
      return { ...action };
    case LOGOUT_SUCCESS:
      return { ...action };
    case LOGIN_REQUEST:
      return { ...action };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUserUsingFireBase,
  signOut,
};

// ###########################################################

// axios function
function setAxiosHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}
function removeAxiosToken() {
  axios.defaults.headers.common["Authorization"] = null;
}

function loginUserUsingFireBase(dispatch, setIsLoading) {
  dispatch(requestLogin());
  setIsLoading(true);

  var provider = new firebase.auth.GoogleAuthProvider();
  //remove this harcode should add the scope dynamically
  provider.addScope("https://mail.google.com/");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const accessToken = result.credential.accessToken;
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL,
        uid: result.user.uid,
      };
      localStorage.setItem("token", result.credential.idToken);
      localStorage.setItem("accessToken", result.credential.accessToken);
      localStorage.setItem("firebaseToken", result.user.uid);
      dispatch(loginSuccess(accessToken, user));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
      setIsLoading(false);
    });
}

function signOut(dispatch, history) {
  console.log("logout succesfull");
}
