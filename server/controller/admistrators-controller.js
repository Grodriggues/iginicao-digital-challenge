const {
  createAdm,
  logAdmIn,
  logAdmOut,
  updateAdmAccount,
  deleteAdmAccount
  
} = require("../services/admistrators-services");

const createAdmProfile = async (req, res) => {
  try {
    const adm = await createAdm(req.body);
    res.status(201).send(adm);
  } catch (e) {
    res.send({ error: e.message }).status(400);
  }
};

const getAdmProfile = async(req,res) => {
  try{
    const user = req.user;
    res.send(user).status(200);
  }catch(e){
    res.send(401)
  }
};


const deleteAdmProfile = async (req, res) => {
  //Todo delete a specific user in the database
  try{
    const user = await deleteAdmAccount(req.params.id);
    res.send(user).status(200)
  }catch(e){
    res.send(400);
  }
};

const updateAdmProfile = async (req, res) => {
  try{
    const user = await updateAdmAccount(req.body,req.user);
    return res.send(user).status(200)
  }catch(e){
    console.log(e)
    res.status(401).send({error:e.message}) ; 
  }
  //Its just the password that can be changed
  //Todo get the request password and send to the service to verify if its a correct password then the user can be able to change his password//
};

const logoutAdmProfile = async (req, res) => {
  try{
    const user = await logAdmOut(req.user);
    res.clearCookie("access_token");
    res.send();
  }catch(e){
    console.log(e);
  }
  //Todo easiest part just get the token out of the client
};

const loginAdmProfile = async (req, res) => {
  try {
    const login = await logAdmIn(req.body);
    res.cookie("access_token", login.token, {
      maxAge: 10000000,
      httpOnly: true
    });
    res.send(login);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createAdmProfile,
  getAdmProfile,
  deleteAdmProfile,
  updateAdmProfile,
  loginAdmProfile,
  logoutAdmProfile
};
