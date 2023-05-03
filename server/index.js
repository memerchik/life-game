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
    database: "lifegame"
})

app.post('/register', (req, res)=>{
    const username = req.body.username
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
                        expiresIn: "1d",
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
                req.session.destroy();
                res.json({
                    err: err,
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
    res.json({
        loggedOut: true
    })
})

app.get("/createGame", verifyJWT, (req, res)=>{
    let responseModel = {
        message: null,
        data: null
    }
    let userdata = req.session.user[0]
    //check if game exists
    db.query("SELECT * FROM `multiplayer` WHERE player1=? AND player2 IS NULL", userdata.id, function(err, result){
        if(err){
            res.send(err)
        }
        else if(result.length>0){
            responseModel.message = "gameExists"
            responseModel.data = result[0]
            res.send(responseModel)
        }
        else if(result.length==0){
            db.query("INSERT INTO `multiplayer` (`id`, `player1`, `player2`, `player1status`, `player2status`, `player1score`, `player2score`) VALUES (NULL, ?, NULL, 'Preparing', NULL, NULL, NULL);", userdata.id, (errr, ress)=>{
                //console.log(ress, errr)
            })
            //console.log(lastId)
            responseModel.message = "gameCreated"
            db.query("SELECT * FROM `multiplayer` WHERE player1=?", userdata.id, (errr, ress)=>{
                let t = ress[0]
                t=JSON.parse(JSON.stringify(t))
                console.log(t, "RESULT")
                if(errr){
                    responseModel.data=errr
                }
                else{
                    responseModel.data=t
                }
                res.send(responseModel)
            })
        }
        else{
            res.send({message: "User doesn't exist"})
        }
    })
})

app.get("/joinGame", verifyJWT, (req, res)=>{
    let responseModel = {
        message: null,
        data: null
    }
    let userdata = req.session.user[0]
    //check if game exists
    db.query("SELECT * FROM `multiplayer` WHERE player1=? AND player2 IS NULL", userdata.id, function(err, result){
        if(err){
            res.send(err)
        }
        else if(result.length>0){
            responseModel.message = "gameExists"
            responseModel.data = result[0]
            res.send(responseModel)
        }
        else if(result.length==0){
            db.query("INSERT INTO `multiplayer` (`id`, `player1`, `player2`, `player1status`, `player2status`, `player1score`, `player2score`) VALUES (NULL, ?, NULL, 'Preparing', NULL, NULL, NULL);", userdata.id, (errr, ress)=>{
                //console.log(ress, errr)
            })
            //console.log(lastId)
            responseModel.message = "gameCreated"
            db.query("SELECT * FROM `multiplayer` WHERE player1=?", userdata.id, (errr, ress)=>{
                let t = ress[0]
                t=JSON.parse(JSON.stringify(t))
                console.log(t, "RESULT")
                if(errr){
                    responseModel.data=errr
                }
                else{
                    responseModel.data=t
                }
                res.send(responseModel)
            })
        }
        else{
            res.send({message: "User doesn't exist"})
        }
    })
})

app.post("/play", (req, res)=>{
    let userdata = req.session.user[0]
    switch(req.body.action){
        case "getInfo":
            db.query("SELECT * FROM `multiplayer` WHERE id=?", req.body.gameId, (errr, ress)=>{
                if(errr){
                    res.send(errr)
                }
                else{
                    res.send(ress)
                }
            })
            break;
        case "setReady":
            let p = "";
            let gameid = "";
            db.query("SELECT id FROM `multiplayer` WHERE player1=? OR player2=?", [userdata.id, userdata.id], (errr, ress)=>{
                gameid=ress[0].id
                db.query("SELECT player1, player2 FROM `multiplayer` WHERE id=?", gameid, (errr, ress)=>{
                    //let a = JSON.parse(JSON.stringify(ress[0]))
                    if(errr){
                        console.log(errr)
                    }
                    else{
                        let a = JSON.parse(JSON.stringify(ress[0]))
                        if(a.player1 == userdata.id){
                            p="1"
                        }
                        else{
                            p="2"
                        }
                        db.query("UPDATE `multiplayer` SET player"+p+"status='Ready' WHERE id=?", gameid, (errr, ress)=>{
                            if(errr){
                                res.send(errr)
                            }
                            else{
                                res.send("updated")
                            }
                        })
                    }
                    
                })
            })
    }
    
})

app.listen(PORT, ()=>{
    console.log("server running on port "+PORT)
})