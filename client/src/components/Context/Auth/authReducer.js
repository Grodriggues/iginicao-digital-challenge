import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  LOAD_ADM
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        adm: action.payload.user,
        isAuthenticated: true
      };
    case LOAD_ADM :
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        adm: action.payload
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        adm: null
      };

    default:
      return state;
  }
};
