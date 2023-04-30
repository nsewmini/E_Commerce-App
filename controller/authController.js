import usermodels from "../model/usermodels.js";
import {comparePassword,hashPassword} from "../helpers/authHelper.js"
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
        try{
            const{name,email,password,phone,address,answer} = req.body
            //validation
            if(!name){
                return res.send({error:"Name is required"});
            }
            if(!email){
                return res.send({error:"email is required"});
            }
            if(!password){
                return res.send({error:"password is required"});
            }
            if(!phone){
                return res.send({error:"Pnone # is required"});
            }
            if(!address){
                return res.send({error:"address is required"});
            }
            if(!answer){
                return res.send({error:"answer is required"});
            }
           
            
        //check user
        const existUser= await usermodels.findOne({email});
        //exist user
        if(existUser){
            return res.status(200).send({
                success:false,
                message:"User already exist"
            })
        }
        //register user
        const hashedPassword= await hashPassword(password);
        //save
        const user =  new usermodels({name,email,password:hashedPassword,phone,address,answer}).save();
        res.status(200).send({
            success:true,
            message:"User registered successfully",
            user
        });
        }catch(error){
            console.log(error)
            res.status(500).send({
                success:false,
                message:"Error in registration",
                error
            })
        }
};

//login
export const loginController = async(req, res) => {
    try {
        const {email,password} = req.body;
        //validation
        if(!email||!password){
            return res.status(200).send({
                success:false,
                message:"Email and password is required"
            })
        }
        const user= await usermodels.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email is not found"
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Password is incorrect"
            })
        }
        //generate token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({
            success:true,
            message:"Login successfully",
            user:{
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
                role : user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        });
    }
};



//forgotPasswordController

 export const forgotPasswordController= async(req,res) =>{

try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await usermodels.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await usermodels.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

 


//test Controller
export const testController = (req, res) => {
   try {
    res.send("protected  route");
   } catch (error) {
    console.log(error)
    res.send({error})
   }
};