const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const PORT = 3001

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "logindb"
})

app.post('/register', (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], (err, result)=>{
        if(err){
            res.send({err:err})
        }
        else{
            res.send("success")
        }
    })
})

app.post("/login", (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, result)=>{
        if(err){
            console.log(err)
        }
        else if(result){
            console.log(result)
        }
        else{
            res.send({message: "wrong username password combination"})
        }
    })
})

app.listen(PORT, ()=>{
    console.log("server running on port "+PORT)
})