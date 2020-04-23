import spinner from "../images/spinner.gif";

import React from 'react'

const Spinner = () => {
  const style = {
    margin:"auto",
    width:'200px',
  }

  return (
    <div id="spinner" style={style}>
       <img src={spinner} alt=""/>
    </div>
  )
}

export default Spinner
