import express from 'express';

import connection from '../connection.cjs';

const router = express.Router();

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import auth from '../services/authentication.cjs';
import checkRole  from '../services/checkRole.cjs';


router.post('/signup', (req, res) => {
    let user = req.body;
    let query = 'select phnum,password from userlogin where phnum=?'
    connection.query(query, [user.phnum], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = 'insert into userlogin(phnum,password) values(?,?)';
                connection.query(query, [user.phnum, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered" })
                    }
                    else {
                        return res.status(500).json(err)




                    }

                })
            } else {
                return res.status(400).json({ message: "Phone num already exist" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })

})

router.post('/login', (req, res) => {
    let user = req.body;
    let query = 'select phnum,password,role from userlogin where phnum=?'
    connection.query(query, [user.phnum], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect username or password" })
            }
            else if (results[0].password == user.password) {
                const response = { phnum: results[0].phnum ,role:results[0].role}
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                console.log(response.role)
                return res.status(200).json({ token: accessToken,role:response.role });
                //add role as 'user or admin' as an attribute
            } else {
                return res.status(400).json({ message: "Something went wrong, please try again later" });
            }
        }
    })
})

router.get('/get', auth.authenticateToken,(req,res)=>{

    // let user= req.body;
    var query ="select phnum,role from userlogin where role='u'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else return res.status(500).json(err);
    })
})

// module.exports=router;
export default router
