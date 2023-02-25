
var stompClient=null
//we make use of stomp to make connectivity with socket
function connect(){
let socket=new SockJS("/server1")
stompClient=Stomp.over(socket)

stompClient.connect({},function(frame){
console.log("connected: "+frame);

$("#name-from").addClass('d-none')
$("#chat-room").removeClass('d-none')

//subscribe
stompClient.subscribe("/topic/return-to",function(response){
showMessage(JSON.parse(response.body))
})

})
}

function showMessage(message){

$("#message-container-table").prepend(`<tr><td><b>${message.name} :</b>  ${message.content}</td></tr>`)

}

function sendMessage(){

let jsonOb={
name:localStorage.getItem("name"),
content:$("#message-value").val()
}

stompClient.send("/app/message",{},JSON.stringify(jsonOb));

}

$(document).ready((e)=>{
//on docuement load.
$("#login").click(()=>{
//on enter button click

let name=$("#name-value").val()
localStorage.setItem("name",name)
$("#name-title").text("Welcome to your Private Chat Room "+name)
//name var will be stored locally

connect();//function call for connectivity
})

$("#send").click(()=>{
sendMessage()
})

$("#logout").click(()=>{

localStorage.removeItem("name")
if(stompClient!=null){
stompClient.disconnect()

$("#name-from").removeClass('d-none')
$("#chat-room").addClass('d-none')

}

})

})