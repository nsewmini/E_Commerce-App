 import JWT from 'jsonwebtoken';
 import usermodels from "../model/usermodels.js";

 //Protected routes token base
 export const requireSignIn= async(req,res, next) => {
     try {
           const decode = JWT.verify(
               req.headers.authorization,             
               process.env.JWT_SECRET
               );
           req.user = decode;         
            next();
     } catch (error) {
         console.log(Error123);
        
     }
 }

 //admin access
 export async function isAdmin(req, res, next) {
     try {
         const user = await usermodels.findById(req.user._id);
         if (user.role !== 1) {
             return res.status(401).send({
                 success: false,
                 message: "Admin access denied"
             });
         } else {
             next();
         }
     } catch (error) {
         console.log(Error);
         res.status(401).send({
             success: false,
             error,
             message: "Error in admin access",
         });
     }
 }

