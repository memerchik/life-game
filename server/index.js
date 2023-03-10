const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt")
const saltRounds = 10

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const jwt = require("jsonwebtoken")

const app = express();

const PORT = 3001

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userid",
    secret: "hugesecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expire: 60 * 60 * 24 //24 hrs
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "logindb"
})

app.post('/register', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
        if(err){
            console.log(err)
        }

        db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hash], (err, result)=>{
            if(err){
                res.send({err:err})
            }
            else{
                res.send("success")
            }
        })
    })

    
})

app.post('/login', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    

    db.query("SELECT * FROM users WHERE username=?", username, (err, result)=>{
        if(err){
            res.send(err)
        }
        else if(result.length>0){
            bcrypt.compare(password, result[0].password, (error, resp)=>{
                if(resp){
                
                    const id = result[0].id
                    const token = jwt.sign({id}, "writeENVvariableHere", {
                        expiresIn: 300,
                    })

                    req.session.user = result

                    console.log(req.session.user)
                    res.json({auth: true, token: token, result: result})
                }
                else{
                    res.send({message : "Wrong username/password combination"})
                }
            })
        }
        else{
            res.send({message: "User doesn't exist"})
        }
    })
})

const verifyJWT = (req, res, next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.send("You don't have a token")
    }
    else{
        jwt.verify(token, "writeENVvariableHere", (err, decoded)=>{
            if(err){
                res.json({
                    auth: false,
                    message: "You failed to authenticate"
                })
            }
            else{
                req.userid = decoded.id
                next();
            }
        })
    }
}

app.get("/isUserAuth", verifyJWT, (req, res)=>{
    res.send("U are authenticated")
})

app.get("/login", (req, res)=>{ // check if user is logged in
    if(req.session.user){
        res.send({loggedin: true, user: req.session.user})
    }
    else{
        res.send({loggedin: false})
    }
})

app.get("/logout", verifyJWT, (req, res)=>{
    req.session.destroy();
    // res.redirect('http://localhost:3000/');
    //res.send()
})

app.listen(PORT, ()=>{
    console.log("server running on port "+PORT)
})