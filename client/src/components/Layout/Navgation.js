import React,{useContext} from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../Context/Auth/authContext";

const Navgation = (props) => {
  const {isAuthenticated,logoutAdmAccount} = useContext(AuthContext);
 
  const style = {
    textDecoration: "none",
    color: "white"
  };
  return (
    <nav id="navigation">
      <ul>
        {!isAuthenticated && (
          <li>
          <Link style={style} to="/signup">
            Registrar
          </Link>
        </li>
        )}
        {isAuthenticated &&(<li>
          <Link style={style} to="/">
            Usuarios
          </Link>
        </li>)}

        {isAuthenticated ? (
          <li> <Link style={style} to="/logout">
          Logout
        </Link></li>
        ) : (
          <li>
          <Link style={style} to="/login">
            Login
          </Link>
         </li>
        )}
        
      </ul>
    </nav>
  );
};

export default Navgation;
