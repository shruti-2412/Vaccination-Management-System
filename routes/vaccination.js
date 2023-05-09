import express from 'express';

import connection from '../connection.cjs';

const router = express.Router();

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import auth from '../services/authentication.cjs';
import checkRole from '../services/checkRole.cjs';

router.post('/add', auth.authenticateToken, (req, res) => {
    let vac = req.body;
    console.log(vac)
    let query = " select * from vaccination where  benf_id=? and reg_dt=? and PhNum=?"

    connection.query(query, [vac.benf_id, vac.Reg_Dt,vac.PhNum],(error, result) => {
        if (!error) {

            if (result.length <= 0) {
                query = 'insert into vaccination(benf_id,vcode,reg_dt,dose_no,vacc_dt,PhNum) values(?,?,?,?,?,?)';
                connection.query(query, [vac.benf_id, vac.Vcode, vac.Reg_Dt, vac.Dose_No, vac.Vacc_Dt,vac.PhNum], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Added" })
                    }
                    else {
                        console.log(err)
                        return res.status(500).json(err)
                    }

                })
            }
            else return res.status(400).json({ message: "Same benificary cannot book more than one vaccines per day" })
        }
        else return res.status(500).json(error)

    })




})

router.get('/prev/:benf_id/:Vcode/:Dose_No', (req, res) => {

    console.log("In api")
    let query = "select * from vaccination where benf_id=? and Vcode=? and Dose_No=?"
    connection.query(query, [req.params.benf_id, req.params.Vcode, req.params.Dose_No], (error, results) => {
        if (!error) {
            return res.status(200).json(results);
        } else return res.status(500).json(error)
    })

})
router.get('/booking', (req, res) => {
    let query = `SELECT v.Reg_No, b.name, v.Reg_Dt, v.Vacc_Dt, a.Vname, v.Dose_No, v.PhNum
    FROM vaccination v
    JOIN vaccine a ON v.Vcode = a.Vcode
    JOIN benificiary b ON v.Benf_ID = b.Benf_ID;`

    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else return res.status(500).json({ message: "SQL error" })
    })
})

router.get('/day', (req, res) => {
    let query = `
    SELECT v.Reg_No, b.name, v.Reg_Dt, v.Vacc_Dt, a.Vname, v.Dose_No, v.PhNum
    FROM vaccination v
    JOIN vaccine a ON v.Vcode = a.Vcode
    JOIN benificiary b ON v.Benf_ID = b.Benf_ID where v.Vacc_Dt=curdate() 
    `
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else return res.status(500).json({ message: "SQL error" })
    })
})

export default router