import express from 'express';
import cors from 'cors';
import connection from './connection.cjs';
import userRoute from './routes/user.js';
import ben from './routes/benificiary.js'

const app =express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/user',userRoute)
app.use('/benificiary',ben)
// module.exports=app;

export default app;
