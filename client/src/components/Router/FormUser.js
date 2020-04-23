import React, { useState, useEffect, useContext, Fragment } from "react";
import userContext from "../Context/Users/userContext";
import AlertContext from "../Context/Alert/alertContext";
import UserItem from "../Users/UserItem";
import avaiableTags from "../utils/avaiableTags";


const AddNewUser = props => {
  const { addUser, updateUser, users } = useContext(userContext);
  const alertContext = useContext(AlertContext);
  

  const [data, setData] = useState({
    name: "",
    email: "",
    tags: []
  });
  // eslint-disable-next-line
  const [tag, setTag] = useState("");

  useEffect(() => {
    setTag("");
  }, [data.tags]);

  useEffect(() => {
    if (props.name && props.email) {
      setData({
        name: props.name,
        email: props.email,
        tags: props.tags
      });
    }
  }, [props]);

  const onChange = event => {
    if (event.target.name === "tag") return setTag(event.target.value);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onClick = event => {
    event.preventDefault();
    if (event.target.name === "undo") return setData({ ...data, tags: [] });
    if(data.tags.includes(event.target.name)) return alertContext.setAlert("Você já selecionou esta tag", "error");
    setData({ ...data, tags: [...data.tags, event.target.name] });
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (props.editing) {
      try{
        const user = await updateUser(props.id,data);
        console.log(user)
        alertContext.setAlert("Usuário editado com sucesso", "success");
        setData({
          name: "",
          email: "",
          tags: []
        });
        return
      }catch(e){
        alertContext.setAlert("Não foi possivel dar update usuario", "error"); 
        return 
      }
      
    }
    const res = await addUser(data);
    
    if(res.error){
      if(res.error.indexOf("E11000") === 0) return  alertContext.setAlert("Uma conta com esse email já existe", "error");
    }
    
    alertContext.setAlert("Usuário criado com sucesso", "success");
    setData({
      name: "",
      email: "",
      tags: []
    });
  };

  return (
    <Fragment>
      <div id="new-user">
        <div className="user-item-alter">
          <UserItem
            name={data.name}
            email={data.email}
            tags={data.tags}
            altering={true}
          />
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="seu nome"
              name="name"
              value={data.name}
              onChange={onChange}
              required
            />
            <input
              type="email"
              placeholder="seu email"
              name="email"
              value={data.email}
              onChange={onChange}
              required
            />

            {avaiableTags.map((uniqueTag,key) => (
              <button
                className="tag-button tag button"
                onClick={onClick}
                name={uniqueTag}
                key={key}
              >
                {uniqueTag}
              </button>
            ))}

            <button
              className="button bg-red mg-y remove"
              name="undo"
              onClick={onClick}
            >
              Retirar tags
            </button>

            {props.editing ? (
              <input type="submit" value="Editar" className="bg-primary btn" />
            ) : (
              <input type="submit" value="Criar" className="bg-primary btn" />
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddNewUser;
