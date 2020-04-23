const { tokenAuthCompare } = require("../helpers/token-helper");
const { getAdmUser } = require("../services/admistrators-services");

const auth = async(req,res,next) =>{
  try{
    const token = req.cookies.access_token;
    const decoded = tokenAuthCompare(token,process.env.TOKEN_SECRET);
    const adm = await getAdmUser(decoded._id,token);
    if(!adm){
      throw new Error("Auth problem")
    }

    req.token = token;
    req.user = adm;
    next();
    
  }catch(e){

    res.status(401).send({error:"You are not authenticated"})
  }
}

module.exports = auth;