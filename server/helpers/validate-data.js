const { encryptPassword, comparePassword } = require("./password-helper");

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateAdmData = async ({ login, password } = {}) => {
  if (!login || !password)
    throw new Error("You need to provide params to this function");
  if (!validateEmail(login)) throw new Error("Email is invalid");
  const encrypted = await encryptPassword(password);
  return Object.freeze({ login, password: encrypted });
};

const verifyAdmCrendtials = async ({ login, password } = {}, Adm) => {
  try {
    const adm = await Adm.findOne({ login });
    if (!adm) throw new Error("This user does not exist");
    const isRightPassword = await comparePassword(password,adm.password);
    if(!isRightPassword) throw new Error("Unable to login");
    return adm;
  } catch (e) {
    return {error:"Unable to login"}
  }
};

module.exports = {
  validateEmail,
  validateAdmData,
  verifyAdmCrendtials
};
