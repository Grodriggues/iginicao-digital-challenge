import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/Auth/authContext";
import validateEmail from "../utils/validateEmail";
import AlertContext from "../Context/Alert/alertContext";

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.history, authContext.isAuthenticated]);

  const [state, setState] = useState({
    login: "",
    password: ""
  });

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { login, password } = state;
    if (!login || !password) {
      return alertContext.setAlert("Preencha todos os campos", "error");
    }
    if (!validateEmail(login)) {
      alertContext.setAlert("Email invalido", "error");
    }
    try {
      const response = await authContext.loginAdmAccount({ login, password });
      if (response.error) {
        return alertContext.setAlert("Login ou Senha incorretos", "error");
      }
      return response;
    } catch (e) {
      alertContext.setAlert("Login ou Senha incorretos", "error");
      return { error: e.message };
    }
  };

  return (
    <div id="login">
      <h1 className="mg-y2">Você precisa Logar para Gerenciar os Usuários</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input name="login" id="" value={state.login} onChange={onChange} />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id=""
          value={state.password}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Logar"
          className="button bg-primary hover"
        />
      </form>
    </div>
  );
};

export default Login;
