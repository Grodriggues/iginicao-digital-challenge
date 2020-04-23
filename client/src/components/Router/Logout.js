import React,{useContext, useCallback,useEffect} from 'react'
import AuthContext from "../Context/Auth/authContext";

// Todo Implement this on Reducer
const Logout = (props) => {
  const {isAuthenticated,logoutAdmAccount} = useContext(AuthContext);
  useEffect(()=>{
    (async()=>{
      await logoutAdmAccount();
      if(isAuthenticated) props.history.push("/login")
    })()
  },[])
  
  return null
}

export default Logout
