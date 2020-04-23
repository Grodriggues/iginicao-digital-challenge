import React, { useReducer, useEffect } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_ADM,
  AUTH_ERROR
} from "../types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
    error: null,
    adm: null
  };

  useEffect(()=>{
    (async()=>{
      await loadUser();
      
    })()
  },[])


  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerAdmAccount = async formData => {
    try {
      const response = await axios.post("/api/adms/signup", formData);
      return response;
    } catch (e) {
      return { error: e.message };
    }
  };

  const loginAdmAccount = async formData => {
    try {
      const {data} = await axios.post("/api/adms/login", formData, {
        withCredentials: true
      });
      if(data.error){
        return {error:data.error}
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });
      
      await loadUser();
      return data;
      
    } catch (e) {
      console.log("to aqui")
      return { error: e.message };
    }
  };

  const setAuthToken = async () => {};

  const loadUser = async () => {
    try {
      const { data } = await axios.get("/api/adms", {
        withCredentials: true
      });
      dispatch({
        type: LOAD_ADM,
        payload: data
      });

      return data;
    } catch (e) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const logoutAdmAccount = async formData => {
    try {
      const { data } = await axios.post(
        "/api/adms/logout",
        {},
        {
          withCredentials: true
        }
      );

      dispatch({
        type: LOGOUT,
        payload: data
      });
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        registerAdmAccount,
        loginAdmAccount,
        loadUser,
        logoutAdmAccount,
        adm:state.adm
        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
