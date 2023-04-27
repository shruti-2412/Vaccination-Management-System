import express from 'express';
import connection from '../connection.cjs';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import auth from '../services/authentication.cjs';

router.post('/add', auth.authenticateToken, (req, res) => {
    let ben = req.body;
    let query = 'select * from manufacturing where lotno=?'
    connection.query(query, [ben.Vcode], (err, results) => {
     
        if (!err) {
            if (results.length <= 0) {
                let query = 'insert into vaccine(LotNo,Vcode,Manufacturer,manuft_dt,exp_dt) values(?,?,?,?,?)';
                connection.query(query, [ben.LotNo,ben.Vcode,ben.Manufacturer,ben.manuft_dt,ben.exp_dt], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Manufturing details has been added." })
                    }
                    else {
                        return res.status(500).json(err)
                    }
                })
            } else {
                return res.status(400).json({ message: "Lot already exist" })
            }
        }
    })

router.patch('/update',auth.authenticateToken,(req,res,next)=>{
    let ben=req.body;
    let query="update manufacturing set Vcode=?,Manufacturer=?,manuft_dt=?,exp_dt=? where lotno=?"
    connection.query(query,[ben.Vcode,ben.Manufacturer,ben.manuft_dt,ben.exp_dt,ben.LotNo],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"LotNo doesnot found"});
            }
            return res.status(200).json({message:"Manufcturing details updated successfully"})

        }
        else return res.status(500).json(err);
    })
})
router.delete('/delete/:id',auth.authenticateToken,(req,res,next)=>{
    const id=req.params.id;
    var query="delete from manufacturing where LotNo=?"
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"LotNo doesnot found"});
            }
            return res.status(200).json({message:"Lot deleted successfully"})
        }else return res.status(500).json(err);
    })
})
})
export default router