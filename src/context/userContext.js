import axios from "axios";
import React from "react";
import {
  requestLogin,
  loginSuccess,
  requestLogout,
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
      axios.axios.defaults.headers.common = null;
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
    isAuthenticated: !!localStorage.getItem("id_token"),
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

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  console.log("login succesfull");
}

function signOut(dispatch, history) {
  console.log("logout succesfull");
}
