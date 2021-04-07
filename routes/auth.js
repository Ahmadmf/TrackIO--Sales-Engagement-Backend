const router =require("express").Router();
const User= require("../models/User");

router.post('/signUp', (req, res) => {
  User.findOne({companyDomain:req.body.email}).then((user) =>{
    if(user){
      console.log("You account has been existed");
      res.send({express:'From SignUp'});
    }
    else{
      console.log("Created a new Account");
      const newUser= new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        companyDomain:req.body.email,
        password: req.body.password
      })
    
      newUser.save();
      res.send({ express: 'From SignUp' });

    }
  })

 });

 module.exports = router;