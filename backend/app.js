const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require('./router/userRouter');
const sellerRouter = require('./router/sellerRouter');
const itemRouter = require('./router/itemRouter')

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});

io.on("connection", (socket)=>{});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(cookieParser());
app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/item', itemRouter);
