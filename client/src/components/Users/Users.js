import React, { useContext, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/Users/userContext";
import AuthContext from "../Context/Auth/authContext";
import UserItem from "./UserItem";
import Spinner from "../utils/Spinner";
import filterNickEmail from "../utils/filterNickEmail";

const Users = (props) => {
  const userContext = useContext(UserContext);
  const { loadUser, adm,isAuthenticated,loading } = useContext(AuthContext);
  const { users, loadUsers } = userContext;
  
  useEffect(() => {
    loadUsers();
    (async () => {
      await loadUser();
    })();
  }, []);
  if(loading && !isAuthenticated){
    props.history.push("/login")
    return null
  }

  if (userContext.loading) {
    return <Spinner />;
  }

 

  return (
    <Fragment>
    
      {adm && <h2 style={{marginBottom:"3rem"}}>Bem vindo {filterNickEmail(adm.login)}!</h2>}
      <div className="container">
        <Link to="/cadastro" className="button bg-primary">
          <i className="fas fa-user-plus"></i>
        </Link>
        <i> Criar um novo usuário</i>
        <div className="users-content">
          {users &&
            users.map((user, id) => (
              <UserItem
                name={user.name}
                email={user.email}
                tags={user.tags}
                key={id}
                id={user._id}
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
