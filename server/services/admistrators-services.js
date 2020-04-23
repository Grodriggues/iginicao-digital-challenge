const { comparePassword } = require("../helpers/password-helper");
const { generateAuthToken } = require("../helpers/token-helper");
const { storeAuthToken } = require("../helpers/storing-data");
const { encryptPassword } = require("../helpers/password-helper")
const {
  validateAdmData,
  verifyAdmCrendtials
} = require("../helpers/validate-data");

const Adm = require("../models/Adm");

const createAdm = async data => {
  try {
    const parsedData = await validateAdmData(data);
    const adm = await new Adm(parsedData).save();
    const user = await storeAuthToken(adm);
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

const logAdmIn = async credentials => {
  try{
    const adm = await verifyAdmCrendtials(credentials, Adm);
    const { token, user } = await storeAuthToken(adm);
    return { token,user };
  }catch(e){
    return {error:e.message}
  }
  
  
};

const logAdmOut = async(user) => {
  try{
    user.tokens = user.tokens.filter(token => token.token !== user.token);
    await user.save();
    return user;
  }catch(e){
    throw new Error(e.message)
  }
};

const getAdmUser = async(id,token) =>{
  try{
    const adm = Adm.findOne({_id:id,"tokens.token":token})
    if(!adm) throw new Error("This didn't work")
    return adm
  }catch(e){
    throw new Error(e.message)
  }
}

const updateAdmAccount = async(data,user) => {
  const adm = user;
  try{
    adm.password = await encryptPassword(data.password);
    await adm.save();
    return adm;
  }catch(e){
    throw new Error("Unable to change the password");
  }
  

}; 

module.exports = {
  createAdm,
  logAdmIn,
  logAdmOut,
  updateAdmAccount,
  getAdmUser
};
