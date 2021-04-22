//request and success
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// failure
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

//logout
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    user: null,
  };
}

export function loginSuccess(accessToken, user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    accessToken: accessToken,
    user: user,
  };
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    user: null,
  };
}

//intial user
export function intialFetchUserData() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    user: null,
  };
}
export function intialFetchingUserFailure() {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  };
}
