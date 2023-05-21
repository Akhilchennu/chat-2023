const express=require('express');
const config=require('./config');

const envport=config.port
const app=express() 
app.get('/',(req,res)=>{
    res.status(200).send("sucess")
})

app.listen(envport,()=>{
  console.log(`server listening on ${envport}`)
})