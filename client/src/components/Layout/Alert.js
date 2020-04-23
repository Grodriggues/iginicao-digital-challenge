import React,{useContext,Fragment} from 'react'
import AlertContext from "../Context/Alert/alertContext";

const Alert = (props) => {
  const alertContext = useContext(AlertContext);

  const style={
    width:"100%",
    color:"white",
    padding:"1rem",
    margin:"1rem 0"
  }

  return (
    <Fragment>
      {alertContext.alerts.map((alert,key) => (
        <div key={key} style={{...style,background:alert.type === "success" ? "#7ED321" : "#FB9394"}}>
          <i className={alert.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"}></i> {alert.msg}
        </div>
      ))}
    </Fragment>
  )
}

export default Alert
