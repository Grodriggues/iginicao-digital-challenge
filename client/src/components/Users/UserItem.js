import React, { useContext } from "react";
import { Link } from "react-router-dom";

//State components
import UserContext from "../Context/Users/userContext";
import AlertContext from "../Context/Alert/alertContext";

import Tag from "../Layout/Tag";

const UserItem = props => {
  //If props is because UserItem is in the Editing Section
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  if(!props.tags) return null
  if (!props.name && !props.email && props.tags.length === 0) return null;
  
  return (
    <div className="user-item">
      <div>
        <h2>{props.name ? props.name : "   "}</h2>
        <p>{props.email ? props.email : "   "}</p>
        <ul>
          {props.tags.map((tag, id) => (
            <li key={id}>
              <Tag key={id} tag={tag} />
            </li>
          ))}
        </ul>
        
      </div>
      {!props.altering && (
        <div>
          <Link
            to={`/edituser/${props.id}`}
            style={{ textDecoration: "none", color: "white" }}
            className="button bg-blue"
          >
            <i className="fas fa-user-edit"></i>
          </Link>
          <button
            style={{
              border: "none",
              padding: "0.6rem",
              marginLeft: "0.5rem",
              cursor: "pointer"
            }}
            onClick={()=>{
              userContext.deleteUser(props.id)
              alertContext.setAlert("Usuário deletado com sucesso", "success");
            }}
            className="button bg-red"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserItem;
