const socketClient = new WebSocket(`ws://${window.document.location.host}`);

// Log socket opening and closing
socketClient.addEventListener("open", event => {
    console.log("Websocket connection opened");
});

socketClient.addEventListener("close", event => {
    console.log("Websocket connection closed");
});

socketClient.onmessage = function(message) {
    const msgBox = document.createElement('div');
    msgBox.classList.add('user-msg');
    
    if (message.data instanceof Blob) {
        reader = new FileReader();
        
        reader.onload = () => {
            msgBox.innerHTML = reader.result;
            document.getElementById('messages').appendChild(msgBox);
        };

        reader.readAsText(message.data);
    } else {
        msgBox.innerHTML = message.data;
        document.getElementById('messages').appendChild(msgBox);
    }
}

const form = document.getElementById('msgForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('inputBox').value;
    socketClient.send(message);
    document.getElementById('inputBox').value = '';
})