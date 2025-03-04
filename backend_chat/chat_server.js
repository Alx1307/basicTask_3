const WebSocket = require("ws");
const server = new WebSocket.Server({port: 9000});

let clientSocket = null;
let adminSocket = null;

server.on("connection", (client) => {
    console.log("Connection opened.");
    
    client.on("message", (message) => {
        const data = JSON.parse(message);
        console.log(`${data.sender} message:`, data.message);

        if (data.sender === 'client') {
            if (adminSocket) {
                adminSocket.send(data.message);
            }
        } else if (data.sender === 'admin') {
            if (clientSocket) {
                clientSocket.send(data.message);
            }
        }
    });

    client.on("close", () => {
        console.log("Connection closed.");

        if (client == clientSocket) {
            clientSocket = null;
        }
        else if (client = adminSocket) {
            adminSocket = null;
        }
    });

    if (!clientSocket) {
        clientSocket = client;
    }
    else if (!adminSocket) {
        adminSocket = client;
    }
});

console.log("Сервер чата запущен на 9000 порту.");