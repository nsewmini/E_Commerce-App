import express from "express";
import { 
    registerController,
    loginController,
    testController,
    forgotPasswordController,
 } from "../controller/authController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
//import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router objects
const router = express.Router();


//routing
//REGISTER || method: POST
router.post('/register',registerController);

//login|| method: POST
router.post('/login',loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);



//test routes
router.get('/test',requireSignIn,isAdmin,testController);
// router.get('/test',requireSignIn,isAdmin,testController);

//protected user routes auth
router.get('/user-auth',(req,res) =>{
   //router.get('/user-auth',requireSignIn,(req,res) =>{
    
    res.status(200).send({ok:true});
});



//protected Admin route auth
 router.get("/admin-auth" , (req, res) => {
//  //router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
     res.status(200).send({ ok: true });
   });

  

export default router;
