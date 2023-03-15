let form = document.getElementById("msgForm"); //send msg to server
form.onsubmit = async (event) => {
    event.preventDefault();
    let res = await fetch(window.location + '/new-msg', {
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
function showMsg(message) {  //create msg element
    let msgElem = document.createElement('div');
    msgElem.innerHTML = '<big style="color:'+ message.color +'">' + message.name + '</big>'
        + '<div>' + message.message + '</div>';
    let container = document.getElementById('messages-container')
    container.append(msgElem);
    container.scrollTop = container.scrollHeight;
}
async function getLastMsgs(){ //generate last msg elements
    let res = await fetch(window.location +'/get-last-msgs')
    let msgs = await res.json();
    console.log(msgs)
    for(msg in msgs){
        showMsg(msgs[msg]);
    }
}
async function subscribe() { //longpool
    let res = await fetch(window.location +'/get-msg');
    if (res.status == 502) {
        await subscribe();
    }
    else if (res.status != 200) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await subscribe();
    }
    else {
        let msg = await res.json();
        showMsg(msg);
        await subscribe();
    }
}
getLastMsgs();
subscribe();