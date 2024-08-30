import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app=express();
const port = 3001;
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Durga8333@",
    database:"user_managment"
})

app.post("/Signup", (req, res) => {
    // const values=[
    //     req.body.firstName,
    //     req.body.lastName,
    //     req.body.password,
    // ]
    console.log(req.body)
    const sql = 'select * from tbl_users where email=?';
    db.query(sql,[req.body.email], (err, result) => {
        if(err){
           return  res.json({alert:"Error in node"});
        }
        console.log(result.length)
        if(result.length===0){
            const sql2="insert into tbl_users (`first_name`,`last_name`,`email`,`password`) values(?,?,?,?)"
             db.query( sql2,[req.body.firstName,req.body.lastName,req.body.email,req.body.password],(err,result)=>{
                console.log(req.body.firstName)
                if(err){
                    return  res.json({alert:"Error in node"});
                 }
                 return res.json({Signup: true})
            }); 
        }
        else{
            return res.json({Signup: false})
        }
    });
})

// app.post("/Signup", (req,res)=>{
//     const sql="insert into tbl_users (`first_name`,`last_name`,`email`,`password`) values(?,?,?,?)";
//     db.query(sql, ["Chitikela","durga","duga@gmail.com","123456789"], (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         console.log(result.length);
//     })
// })

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});