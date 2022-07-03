const express=require('express')
const https=require('https')
const path=require('path')
const fs=require('fs')
const app=express()
const PORT=3000
const secret=Math.floor(Math.random()*100)
app.get('/secret', (req,res)=>{
    res.send('Your secret number is ' +  secret)
})
app.get('/', (req,res)=>{
  return  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
}, app).listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
})