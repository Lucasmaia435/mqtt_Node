const options = {
    clientId: "node-user",
    username: 'user_name',
    password: 'user_pass',
    port: 'server_port',
}
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://tailor.cloudmqtt.com',options);

client.on('connect',() => {
    console.log("connected");
});

client.subscribe('topic');
/*
client.subscribe('topic1');
client.subscribe('topic2');
*/

client.on("message",(topic,message,packet) => {
    console.log(topic);
    console.log(message.toString());
});

client.publish("topic","message");