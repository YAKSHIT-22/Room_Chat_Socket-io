const socket = io("http://localhost:3000")
const chatbox = document.querySelector("#chatbox")
const url = new URL(location.href)
const room = url.searchParams.get("room")
const username = url.searchParams.get("username")
const input = document.querySelector("input");
const button = document.querySelector("button");


button.addEventListener("click",(e)=>{
        e.preventDefault()
        socket.emit("chatmessage",input.value)
        input.value = ""
})
socket.on("chat",(obj)=>{
        displayMessage(obj.username,obj.msg)
        chatbox.scrollTop = chatbox.scrollHeight
})
socket.emit("joinroom",{username: username, room:room})
socket.on("join",(data)=>{
         displayMessage(data.username,data.msg)
         chatbox.scrollTop = chatbox.scrollHeight
})
socket.on("left",(obj)=>{
    displayMessage(obj.username,obj.msg)
    chatbox.scrollTop = chatbox.scrollHeight

})
socket.on("connect", ()=>{
    console.log("connected")
})

function displayMessage(username,msg){
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
         <p class="user">${username}</p>
         <p class="chat_message">${msg}</p>
    `
    chatbox.appendChild(div)
}