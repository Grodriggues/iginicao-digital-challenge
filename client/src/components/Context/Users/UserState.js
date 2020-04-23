import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";
import {
  ADD_USER,
  LOAD_USERS,
  DELETE_USER,
  GET_USER,
  UPDATE_USER
} from "../types";

const UserState = props => {
  const initialState = {
    users: [],
    loading: true,
    user: {}
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadUsers = () => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users");
        console.log(data);
        dispatch({
          type: LOAD_USERS,
          payload: data
        });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  //const setLoading = () => {};

  const addUser = async formData => {
    const { data } = await axios.post(`api/users`,formData)
    dispatch({
      type: ADD_USER,
      payload: data
    });
    return data;
  };

  const getUser = id => {
    (async () => {
      const { data } = await axios.get(`/api/users/${id}`);

      dispatch({
        type: GET_USER,
        payload: data
      });
    })();
  };

  const deleteUser = async id => {
    try {
      const user = await axios.delete(`/api/users/${id}`);
      //Todo implement delete user is not working
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    } catch (e) {
      return e;
    }
    //Todo gotta fix it , when adm deletes the User you have to realod the page
    
  };

  const updateUser = async(id, formData) => {
    try{
      const { data } = await axios.patch(`/api/users/${id}`,formData);
      console.log("to aqui---- ",id)
      dispatch({
        type: UPDATE_USER,
        payload: data
      });
      return data
    }catch(e){
      console.log(e.message)
    }
    // Todo upload user is not working as well
   
    
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        addUser,
        getUser,
        user: state.user,
        updateUser,
        deleteUser,
        loadUsers,
        loading: state.loading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
