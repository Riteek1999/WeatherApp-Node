const express = require("express");
const app = express();
const weatherRoute = require("./routes/weather");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));


app.get("/", weatherRoute);
app.post("/", weatherRoute);




app.listen(3000, ()=>{
    console.log("Server is listening in port 3000");
})