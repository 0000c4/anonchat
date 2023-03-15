let form = document.getElementById("msgForm"); //send msg to server
form.onsubmit = async (event) => {
    event.preventDefault();
    let res = await fetch('/new-msg', {
        method: "POST",
        body: JSON.stringify({
            name: form.name.value,
            color:  getComputedStyle(document.getElementById("changeColorName")).backgroundColor,
            message: form.msg.value
        }),
        headers: { "Content-Type": "application/json" }
    });
    form.msg.value = "";
}

let create_room = document.getElementById("create_room"); //send room settings to server
create_room.onsubmit = async (event) => {
    event.preventDefault();
    let res = await fetch('/create_room', {
        method: "POST",
        body: JSON.stringify({
            name: create_room.room_name.value,
            security: create_room.security.value,
            room_timer: ()=>{
                if(create_room.room_timer.value == ''){return 'null'}
                else{
                    return create_room.room_name.value
                }
            },
            password: create_room.room_password.value
        }),
        headers: { "Content-Type": "application/json" }
    });
}
let connect_room = document.getElementById("connect_room"); //login to room
connect_room.onsubmit = async (event) => {
    event.preventDefault();
    let res = await fetch('/private/connect_room', {
        method: "POST",
        body: JSON.stringify({
            name: connect_room.id.value,
            password: connect_room.password.value
        }),
        headers: { "Content-Type": "application/json" }
    });
    if(res.status == 200){
        window.location = window.location + 'private/' + connect_room.id.value;
    }
}
async function showRooms() {  //create msg element
    let welcome_block = document.getElementById('welcome_block');
    welcome_block.classList.toggle('active');
    let res = await fetch('/public_list')
    let rooms = await res.json();
    for(room in rooms){
        let roomElem = document.createElement('div');
        roomElem.innerHTML = '<a class="public_room" href="public/'+ rooms[room].name +'_'+ rooms[room].id +'">' + rooms[room].name +'</a>'
        let container = document.getElementById('messages-container')
        container.append(roomElem);
        container.scrollTop = container.scrollHeight;
    }
}

function showMsg(message) {  //create public_room element
    let msgElem = document.createElement('div');
    msgElem.innerHTML = '<big style="color:'+ message.color +'">' + message.name + '</big>'
        + '<div>' + message.message + '</div>';
    let container = document.getElementById('messages-container')
    container.append(msgElem);
    container.scrollTop = container.scrollHeight;
}

async function getLastMsgs(){ //generate last msg elements
    let welcome_block = document.getElementById('welcome_block');
    let res = await fetch('/get-last-msgs')
    let msgs = await res.json();
    welcome_block.classList.toggle('active');
    document.getElementById("msgForm").classList.add('active')
    for(msg in msgs){
        showMsg(msgs[msg]);
    }
}