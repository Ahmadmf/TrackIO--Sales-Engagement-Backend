const router =require("express").Router();


router.get('/signUp', (req, res) => {
    console.log("Hello Firoz In Auth JS");
   res.send({ express: 'Hello From Express' });
 });

 module.exports = router;