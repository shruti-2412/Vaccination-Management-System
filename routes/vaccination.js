import express from 'express';

import connection from '../connection.cjs';

const router = express.Router();

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import auth from '../services/authentication.cjs';
import checkRole  from '../services/checkRole.cjs';

router.post('/add',auth.authenticateToken,(req,res)=>{
    let vac= req.body;
    console.log(vac)
    let query=" select * from vaccination where  benf_id=? and reg_dt=?"
    
    connection.query(query,[vac.benf_id,vac.Reg_Dt],(error,result)=>{
        if(!error){ 
            
            if(result.length<=0){
            query= 'insert into vaccination(benf_id,vcode,reg_dt,dose_no,vacc_dt) values(?,?,?,?,?)';
            connection.query(query,[vac.benf_id,vac.Vcode,vac.Reg_Dt,vac.Dose_No,vac.Vacc_Dt],(err,results)=>{
                if (!err) {
                    return res.status(200).json({ message: "Successfully Added" })
                }
                else { 
                    console.log(err)
                    return res.status(500).json(err)
                }
        
            })
          }
            else return res.status(400).json({message:"Same benificary cannot book more than one vaccines per day"})
        } 
        else return res.status(500).json(error)
    
    })
        
    

    
})
export default router