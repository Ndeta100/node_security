const express=require('express')
const helmet=require('helmet')
const http=require('https')
const path=require('path')
const fs=require('fs')
const passport=require('passport')
const {Strategy}=require('passport-google-oauth20')
const cookieSession=require('cookie-session')
require('dotenv').config()
const app=express()
const PORT=3000 ||process.env.PORT
const config={
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    COOKIE_KEY_1:process.env.COOKIE_KEY_1,
    COOKIE_KEY_2:process.env.COOKIE_KEY_2
}
const AUTH_OPTIONS={
    callbackURL:'/auth/google/callback',
    clientID:config.CLIENT_ID,
    clientSecret:config.CLIENT_SECRET
}
function verifyCallback(accessToken, refreshToken, profile, done){
    console.log('Google profile', profile);
    done(null, profile);
}
passport.use(new Strategy(AUTH_OPTIONS,verifyCallback ))
//Save the session to the cookie
passport.serializeUser((user, done)=>{
done(null, user)
})

//Read the session from the cookie
passport.deserializeUser((obj,done)=>{
    
    done(dull, obj)
})
const secret=Math.floor(Math.random()*100)
app.use(helmet())
app.use(cookieSession({
    name:'session',
    maxAge:24*60*60*1000,
    keys:[config.COOKIE_KEY_1, config.COOKIE_KEY_2]
}))
app.use(passport.initialize())
app.use(passport.session())
function checkLoggedIn(req,res,next){
   
    const isLoggedIn=req.isAuthenticated() && req.user
    if(!isLoggedIn){
       res.status(401).json({
           error:'You must log in!'
       })
    }
        next()
    }
app.get('/auth/google', passport.authenticate('google',{
    scope:['email']
}))
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect:'/failure',
    successRedirect:'/',
    session:true
}), (req,res)=>{
  console.log('Google called us back')
})
app.get('/auth/logout',(req,res)=>{
    req.logout()//Removes req.users and clears any logged in sessions
    return res.redirect('/')
})
app.get('/secret',checkLoggedIn, (req,res)=>{
    res.send('Your secret number is ' +  secret)
})
app.get('/failure', (req,res)=>{
    res.send('failed to log in!')
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