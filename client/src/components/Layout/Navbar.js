import React from "react";

import ignicaoImg from "../images/ignicao.png"

const Navbar = () => {
  return (
    <nav id="navbar">
      <img src={ignicaoImg} alt=""/>
      <h1>Ignição <span className="primary-color">Digital</span></h1>
     
    </nav>
  )
}

export default Navbar
