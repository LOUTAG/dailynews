const Users = require("../models/Users");
const mongoose = require('mongoose');

module.exports = (app) => {
  app.post("/api/register", (req, res) => {
    const user = new Users({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const addUser = async () => {
      try {
        await user.save();
        res.send("User added successfully");
      } catch (error) {
        res.status(400).send(error);
      }
    };
    addUser();
  });

  app.post("/api/login", (req, res) => {
    const logUser = async () => {
      try {
        const user = await Users.findOne({
          email: req.body.email,
          password: req.body.password,
        });
        let userNoPassword = user.toObject();
        delete userNoPassword.password;
        res.send(userNoPassword);
      } catch (error) {
        res.status(400).send(error);
      }
    };
    logUser();
  });

  app.post('/api/users/edit', (req, res)=>{
    editUser = async ()=>{
      const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.newPassword
      });
      try{
        const userUpdated = await Users.findOneAndUpdate({_id: req.body.id}, user);
        userNoPassword = userUpdated.toObject();
        delete userNoPassword.password;
        res.send(userNoPassword);
      }catch(error){
        res.status(400).send(error);
      };
    }

    editUser();
  });
};
