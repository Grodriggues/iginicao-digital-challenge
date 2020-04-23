const {
  encryptPassword,
  comparePassword
} = require("../helpers/password-helper");


describe("encrypt password",()=>{
  test("Should return a different value",()=>{
    const password = encryptPassword("Gabriel");
    expect(password).not().toBe("Gabriel")
  })
})
