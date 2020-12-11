const weatherRoute = require("express").Router();
const fetch = require("node-fetch");
require('dotenv').config();

weatherRoute.get("/", (req,res)=>{
    res.render('index',{
        city:null,
        temp:null,
        desc:null,
        icon:null,
        cod:null
    });
});
weatherRoute.post("/",  async(req, res)=>{
        let api_key = process.env.API_KEY;
        let city = req.body.city;
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&mode=json`;
        try{
            await fetch(api_url).then(res=>res.json()).then(data=>{
                if(data.cod==404){
                    res.render('index', {
                        city:'notfound',
                        desc:null,
                        temp:null,
                        icon:null,
                        cod:data.cod
                    })                    
                }
                if(data.cod==200){
                res.render('index', {
                    city:data.name,
                    desc:data.weather[0].description,
                    temp:data.main.temp,
                    icon:data.weather[0].icon,
                    cod:data.cod
                })
            }
            });
        }
        catch(err){
            res.render('index');
        }
});



module.exports = weatherRoute;
