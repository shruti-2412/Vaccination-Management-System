import express from 'express';
import connection from '../connection.cjs';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import auth, { authenticateToken } from '../services/authentication.cjs';

router.post('/add', auth.authenticateToken, (req, res) => {
    let ben = req.body;
    console.log(ben)
    let query = 'select * from benificiary where phnum=? and name=? and address=?'
    connection.query(query, [ben.phnum, ben.name, ben.address], (err, results) => {
     console.log("hello")
        if (!err) {
            if (results.length <= 0) {
                console.log("hello2")
                console.log(ben.gender)
                let query = 'insert into benificiary(name,address,dob,gender,phnum,adharNum) values(?,?,?,?,?,?)';
                connection.query(query, [ben.name, ben.address, ben.dob, ben.gender, ben.phnum, ben.adharNum], (err, results) => {
                    if (!err) {
                        console.log("hello3")
                        return res.status(200).json({ message: "Successfully benificiary has been added." })
                    }
                    else {
                        console.log(err)
                        return res.status(500).json(err)
                    }
                })
            } else {
                return res.status(400).json({ message: "Benificiary already exist.",})
            }
        }
        
    })
})

router.patch('/update',auth.authenticateToken,(req,res)=>{
    let benf=req.body;
    let query="update benificiary set name=?,address=?,dob=?,gender=?,adharnum=? where benf_id=?"
    connection.query(query,[benf.name,benf.address,benf.dob,benf.gender,benf.adharnum,benf.benf_id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Benificiary ID doesnot found"});
            }
            return res.status(200).json({message:"Benificiary updated successfully"})

        }
        else return res.status(500).json(err);
    })
})
router.delete('/delete/:id',auth.authenticateToken,(req,res)=>{
    const id=req.params.id;
    var query="delete from benificiary where benf_id=?"
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Benificiary ID doesnot found"});
            }
            return res.status(200).json({message:"Benificiary deleted successfully"})
        }else return res.status(500).json(err);
    })
})

router.get('/get/:num', auth.authenticateToken,(req,res)=>{
 let b= req.params.num;
    // let user= req.body;
    var query ="select * from benificiary where phnum=?";
    connection.query(query,[b],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else return res.status(500).json(err);
    })
})
export default router