import { Express } from "express";
const mysql = require("mysql");

const app = Express()

app.use(Express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: ""
})