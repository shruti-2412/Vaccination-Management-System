import express from 'express';
import connection from '../connection.cjs';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import auth from '../services/authentication.cjs';

router.post('/add', auth.authenticateToken, (req, res) => {
    let ben = req.body;
    let query = 'select * from benificiary where phnum=? and name=? and address=?'
    connection.query(query, [ben.phnum, ben.name, ben.address], (err, results) => {
     
        if (!err) {
            if (results.length <= 0) {
                let query = 'insert into benificiary(name,address,dob,gender,phnum) values(?,?,?,?,?)';
                connection.query(query, [ben.name, ben.address, ben.dob, ben.gender, ben.phnum], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully benificiary has been added." })
                    }
                    else {
                        return res.status(500).json(err)
                    }
                })
            } else {
                return res.status(400).json({ message: "Benificiary already exist." })
            }
        }
    })



})
export default router