import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Routes components
import FormUser from "./components/Router/FormUser";
import EditUser from "./components/Router/EditUser";
import Login from "./components/Router/Login";
import Register from "./components/Router/Register";
import Logout from "./components/Router/Logout";

import PrivateRoute from "./components/utils/PrivateRoute";

//Layout Components
import Navbar from "./components/Layout/Navbar";
import Container from "./components/Layout/Container";
import Navgation from "./components/Layout/Navgation";
import Alert from "./components/Layout/Alert";

/* Users component */
import Users from "./components/Users/Users";


/* States */
import UserState from "./components/Context/Users/UserState";
import AlertState from "./components/Context/Alert/AlertState";
import AuthState from "./components/Context/Auth/AuthState";

const App = () => {
  return (
    <AuthState>
      <UserState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Navgation />
              <Container>
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Users} />
                  <Route exact path="/cadastro" component={FormUser} />
                  <Route exact path="/edituser/:id" component={EditUser} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Register} />
                  <Route exact path="/logout" component={Logout} />
                </Switch>
              </Container>
            </Fragment>
          </Router>
        </AlertState>
      </UserState>
    </AuthState>
  );
};

export default App;
