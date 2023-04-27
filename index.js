import express from 'express';
import cors from 'cors';
import connection from './connection.cjs';
import userRoute from './routes/user.js';
import benRoute from './routes/benificiary.js'
import vaccRoute from './routes/vaccine.js'
import manuRoute from './routes/manufacturing.js'
import vaccinateRoute from './routes/vaccination.js'
const app =express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/user',userRoute)
app.use('/benificiary',benRoute)
app.use('/vaccine',vaccRoute)
app.use('/manufacturing',manuRoute)
app.use('/vaccination',vaccinateRoute)
// module.exports=app;

export default app;
