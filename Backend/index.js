import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './Config/db.js';
import authRoutes from "./routes/authRoute.js" ;
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoute from "./routes/productRoute.js"
import cors from 'cors'


dotenv.config();

connectDB();

const app=express();


app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product', productRoute)

app.get('/',(req,resp)=>{
    resp.send("Hllo")
})
const Port=process.env.PORT || 5000;

app.listen(Port,()=>{
    console.log(`Server Running on ${Port} `);
    
})