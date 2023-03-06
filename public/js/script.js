const socket = io("https://roomchatsocket-io-production.up.railway.app")
const chatbox = document.querySelector(".chatbox")
const chatarea = document.querySelector(".chat-area");
const url = new URL(location.href)
const room = url.searchParams.get("room")
const username = url.searchParams.get("username")
const input = document.querySelector("input");
const button = document.querySelector("button");


button.addEventListener("click",(e)=>{
    e.preventDefault()
    if (input.value == "") {
        alert("Please type something")
    }
    else {
        socket.emit("chatmessage", input.value)
        input.value= ""
 
    }
      
       
})
function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        if (input.value == "") {
            alert("Please type something")
        }
        else {
            socket.emit("chatmessage", input.value)
            input.value= ""
     
        
        }
    } else {
       
    }
 } 
socket.on("chat",(obj)=>{
        displayMessage(obj.username,obj.msg)
        chatbox.scrollTop = chatbox.scrollHeight
        chatarea.scrollTop = chatbox.scrollHeight
})
socket.emit("joinroom",{username: username, room:room})
socket.on("join",(data)=>{
         displayMessage(data.username,data.msg)
         chatbox.scrollTop = chatbox.scrollHeight
         chatarea.scrollTop = chatbox.scrollHeight
})
socket.on("left",(obj)=>{
    displayMessage(obj.username,obj.msg)
    chatbox.scrollTop = chatbox.scrollHeight
    chatarea.scrollTop = chatbox.scrollHeight

})
socket.on("connect", ()=>{
    console.log("connected")
})

function displayMessage(username,msg){
    const div1 = document.createElement("div");
    const inputString = username;
    const outputString1 = inputString.slice(0, 1);
    div1.classList.add("message_box");
    div1.innerHTML = `  <div class="chat-smg-img">
    <div class="img bg-color">
        <span class="img-color">${outputString1}</span>
    </div>
</div>
<div class="chat-msg-content">
    <div class="chat-msg-name">
        <div class="msg-name user">
            <h6 class="user">
                ${username}
            </h6>
        </div>  
     </div>
     <div class="chat-msg-text chat_message">
        <p>
            ${msg}
        </p>
        </div>
    </div>
    `
    
    chatbox.appendChild(div1)
}
