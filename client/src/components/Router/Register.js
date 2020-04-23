import React, { useState, useContext } from "react";
import AlertContext from "../Context/Alert/alertContext";
import AuthContext from "../Context/Auth/authContext";
import validateEmail from "../utils/validateEmail";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { registerAdmAccount } = useContext(AuthContext);
  const [state, setState] = useState({
    login: "",
    password: "",
    repeatedPassword: ""
  });

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!state.password || !state.login) {
      return alertContext.setAlert(
        "Por favor preencha todos os campos",
        "error"
      );
    }
    if(!validateEmail(state.login)){
      alertContext.setAlert("Email inválido","error")
    }

    if (state.password !== state.repeatedPassword) {
      return alertContext.setAlert("As senhas estão diferentes", "error");
    }
    const {login,password} = state
    const user = await registerAdmAccount({login,password})

    if(user.status === 201) {
      alertContext.setAlert("Conta criada com sucesso", "success");
      setState({
        login: "",
        password: "",
        repeatedPassword: ""
      })
    }else{
      alertContext.setAlert("Já existe uma conta com esse email", "error");
    }


    
      
    
  };

  return (
    <div id="login">
      <h1 className="mg-y2">Cadastre-se para Gerenciar os Usuários</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="login"
          id=""
          value={state.login}
          onChange={onChange}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id=""
          value={state.password}
          onChange={onChange}
        />
        <input
          type="password"
          name="repeatedPassword"
          id=""
          value={state.repeatedPassword}
          onChange={onChange}
          placeholder="Repita a senha"
        />
        <input type="submit" value="Cadastrar" className="button bg-primary hover" />
      </form>
    </div>
  );
};

export default Register;
