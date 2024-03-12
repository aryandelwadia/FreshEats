const express = require('express');
const userRouter = require('./router/userRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();;

const app = express();

app.use(express.json());
app.listen(3000, ()=>{
    console.log('listening on 3000');
})
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/user', userRouter);


