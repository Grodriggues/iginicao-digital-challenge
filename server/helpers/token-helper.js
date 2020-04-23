const jwt = require("jsonwebtoken");

const generateAuthToken = (adm_identifier,SECRET) =>{
  return jwt.sign({_id:adm_identifier},SECRET)
 
}

const tokenAuthCompare = (adm_token,SECRET) =>{
  return jwt.verify(adm_token,SECRET);
}

module.exports = {
  generateAuthToken,
  tokenAuthCompare
}