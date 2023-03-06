const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require('cors')
const server = require("http").createServer(app);
const io = require("socket.io")(server)
const users = {}
app.use(express.static("public"))
app.use(cors());
io.on("connection",(socket)=>{
      socket.on("joinroom",(obj)=>{
           users[socket.id] = obj;
           socket.join(obj.room)
           socket.to(obj.room).emit("join",{username:"ChitoBot",msg:`${obj.username} joined the chatroom`})
      })
       socket.on("chatmessage",(msg)=>{
            io.to(users[socket.id]['room']).emit("chat", {username:users[socket.id]['username'],msg:msg})
       })
       socket.on("disconnect",()=>{
          const username = users[socket.id]['username'];
          const room = users[socket.id]['room'];
          socket.to(room).emit("left",{username: username,msg:`${username} left the ${room} chatroom`})
          delete users[socket.id]
       })
})
server.listen(port,()=>{
    console.log(`server running at ${port}`)
})
