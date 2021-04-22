import axios from "axios";
import React, { useEffect } from "react";
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
  intialFetchUserData,
  intialFetchingUserFailure,
  logoutSuccess,
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
    isAuthenticated: !!localStorage.getItem("accessToken"),
    user: null,
  });
  useEffect(() => {
    getUserDetails(dispatch);
  }, [dispatch]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

/// use state ////////////////////////////////////////
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

// ###########################################################

// axios function
// function setAxiosHeader(accessToken) {
//   axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
// }
// function removeAxiosToken() {
//   axios.defaults.headers.common["Authorization"] = null;
// }

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
      console.log("finedhs calling");
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
      setIsLoading(false);
    });
}

function getUserDetails(dispatch) {
  dispatch(intialFetchUserData());
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", config)
      .then((result) => {
        const user = {
          name: result.data.name,
          email: result.data.email,
          photoUrl: result.data.picture,
        };
        dispatch(loginSuccess(accessToken, user));
      });
  } else {
    dispatch(intialFetchingUserFailure());
    console.log("failure from fetching the details");
  }
}

function signOut(dispatch) {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("firebaseToken");
  dispatch(logoutSuccess());
  console.log("logout succesfull");
}

function signOutWithoutDispatch() {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("firebaseToken");
  console.log("logout succesfull");
}

//####################################################
export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUserUsingFireBase,
  signOut,
  getUserDetails,
  signOutWithoutDispatch,
};
