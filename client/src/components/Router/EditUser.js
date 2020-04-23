import React, { useEffect, Fragment, useContext, useState } from "react";
import FormUser from "./FormUser";
import UserContext from "../Context/Users/userContext";

const EditUser = ({ match }) => {
  const userContext = useContext(UserContext);
  const { getUser } = userContext;
  const {email,_id,name,tags} = userContext.user; // Reset this to fields get cleaned up

  useEffect(() => {
    const x = getUser(match.params.id);
    
  }, []);

  return (
    
    <Fragment>
      {userContext.user && <FormUser email={email} id={_id} name={name} tags={tags} editing={true}/>}
    </Fragment>
  );
};

export default EditUser;
