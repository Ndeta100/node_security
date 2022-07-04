const express=require('express')
const helmet=require('helmet')
const http=require('https')
const path=require('path')
const fs=require('fs')
const app=express()
const PORT=3000 ||process.env.PORT
const config={
    CLIENT_ID='927823460844-8vfvudfd91kcdib9sdt01q44r4hb9t0q.apps.googleusercontent.com',
    CLIENT_SECRET='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'
}
const secret=Math.floor(Math.random()*100)
app.use(helmet())

function checkLoggedIn(req,res,next){
    const isLoggedIn=true
    if(!isLoggedIn){
       res.status(401).json({
           error:'You must log in!'
       })
    }
        next()
    }
app.get('/auth/google', (req,res)=>[

])
app.get('/auth/google/callback', (req,res)=>{

})
app.get('/auth/logout',(req,res)=>[

])
app.get('/secret',checkLoggedIn, (req,res)=>{
    res.send('Your secret number is ' +  secret)
})
app.get('/', (req,res)=>{
  return  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
})

// https.createServer({
//     key:fs.readFileSync('key.pem'),
//     cert:fs.readFileSync('cert.pem')
// }, app).listen(PORT, ()=>{
//     console.log(`App running on port ${PORT}`)
// })