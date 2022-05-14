const express = require("express");
const session = require("express-session");
const ejs     = require("ejs");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get("/",(req,res)=>{
    res.send("Welcome to the login system")
})
app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`))
