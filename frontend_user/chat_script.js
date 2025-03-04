const connection = new WebSocket("ws://localhost:9000");

connection.onopen = () => {
    console.log("Connection opened.");
};

connection.onerror = (error) => {
    console.log(`WebSocket Error: ${error}.`);
};

connection.onclose = () => {
    console.log("Connection closed.")
};

connection.onmessage = (event) => {
    message = document.createElement('p');
    message.textContent = "Администратор: " + event.data;
    document.getElementById('textArea').append(message);
    console.log("Admin response: ", event.data);
};

function sendMessage(){
    const text = document.getElementById('messageArea').value;
    if (text == "") {
        alert("Пожалуйста, введите не пустую строку!");
    }
    else {
        const message = document.createElement('p');
        connection.send(JSON.stringify({ sender: 'client', message: text }));
        message.textContent = "Вы: " + text;
        document.getElementById('textArea').append(message);
        document.getElementById('messageArea').value = "";
    }
};