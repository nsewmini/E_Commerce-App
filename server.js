import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './route/authRoutes.js';
import categoryRoutes from "./route/categoryRoutes.js";
import productRoutes from "./route/productRoutes.js";
import cors from 'cors';
import path  from path ;
import { fileURLToPath } from 'url';
Error.stackTraceLimit = 20; // set stack trace limit to 20
Error.prepareStackTrace = function(error, stackTrace) {
    return stackTrace.map(frame => {
      return `${frame.getFunctionName()} (${frame.getFileName()}:${frame.getLineNumber()}:${frame.getColumnNumber()})`;
    }).join('\n');
  };
  
//configure dotenv
dotenv.config();

//database connection
connectDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));


//routing
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get('/', (req, res) => {
//     res.send("<h1>Welcome To the Ecommerce Website</h1>");
// });

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

const port = process.env.PORT || 8080;

//run listen
app.listen(port, () => {
    console.log(`Server running on mode ${process.env.DEV_MODE} port ${port}`.bgCyan.white);
});