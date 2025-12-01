import authmoule from "../module/authmodule.js";

const authcontroller ={
  async signup (req,res){
    return authmoule.signup(req, res);
  },
  async login(req, res){
    return authmoule.login(req, res);
  },
  async logout(req, res){
    return authmoule.logout(req, res);
  }
}
export default authcontroller;