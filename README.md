# Broker MQTT :desktop_computer:

:octocat: Este repositório mostra um Broker MQTT básico construído usando Nodejs e MQTT.js

--- 
# Configurando e preparando o ambiente
## Instalar o Node no seu computador.
Instale o Node a partir deste link : https://nodejs.org/.

Após instalar o Node, verifique as suas versões. 
```bash
node -v
npm -v
```
Output: 
```bash
v10.16.0
6.9.0
```

## Crie uma pasta para o projeto 
```bash
C:\Users\user\Desktop> mkdir mqtt_broker
C:\Users\user\Desktop> cd mqtt_broker
```
> mkdir "nome_da_pasta" cria uma nova pasta
> cd "nome_da_pasta" entra na pasta

## Inicie um projeto 
```bash
C:\Users\user\Desktop\mqtt_broker> npm init -y
```
Irá ser gerado um package.json, que é o arquivo de gerenciamento do nosso projeto, onde irá estar listado o autor, dependencias usadas e etc.

```json
{
  "name": "mqtt_node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
> Package.json criado

## Instalar a dependência MQTT.js
```bash
C:\Users\user\Desktop\mqtt_broker> npm install mqtt --save
```
Depois da instalação ser concluída será adicionado a sessão de dependencies ao nosso package.json:
```json
  "dependencies": {
    "mqtt": "^3.0.0"
  }
```
# Desenvolvendo o Broker

## Broker.js
Na sua pasta, crie um arquivo chamado `broker.js`

Nas primeiras linhas iremos chamar a nossa dependência mqtt e criaremos um client, que irá ser responsável por nossa conexão com o servidor mqtt.

```javascript
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://server_adress",options);
```
O argumento `options` na função `mqtt.connect()` é um objeto que varia para os servidores mqtt, como por exemplo, nós servidores do [CloudMQTT](https://www.cloudmqtt.com/), que o `options` deve ser:
```javascript
const options = {
    clientId: "node-user",
    username: 'user_name',
    password: 'user_pass',
    port: 'server_port',
}
```

## Verificando conexão com o servidor

Para verificarmos se a conexão com o servidor foi iniciada, usamos o metodo `.on(connect, ...)` do `client` :
```javascript
client.on("connect",() => {
    console.log("Connected");
});
```
Se houver a conexão com o nosso servidor teremos o output:
```bash
Connected
```

## Realizar `subscribes`

No MQTT as informações são trabalhadas através de `subscribes` e `publishes`. Os `subscribes` servem para "inscrever" nosso Broker, em determinado topic, ou seja, todas as informações daquele topic irão passar por nosso servidor.

```javascript
client.subscribe("topic");
/*
client.subscribe("topic1");
client.subscribe("topic2");
*/
```

## Visualizar payloads de um topic
Para visualizarmos a informação dos topics que o nosso Broker está inscrito, é usado o método `.on("message",...)` do nosso `client`:

```javascript
client.on("message",() => {
 /* ... */
});
```
Porém a nossa mensagem, tem até 3 argumentos, `topic`, `payload` e `packet`. Então :

```javascript
client.on("message",(topic,payload,packet) => {
    console.log("This topic: " + topic);
    console.log("This message/payload: " + payload.toString());
});
```
O `topic` já é uma string, mas o `payload` é um *Buffer*, sendo necessário a conversão para string para podermos ter o seguinte output: 
```bash
This topic: topic
This message/payload: message from topic
```

## Realizar `publishes`

`Publishes` servem para publicarmos informações no nosso servidor mqtt. No nosso `publish` é necessário que haja um `topic` e um `payload`.
```javascript
client.publish("topic","payload");
```
> Caso você realize um `publish` em um `topic` que o seu broker fez um `subscribe`, o seu broker também irá receber o seu publish.

# Broker concluído
```javascript
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
```

## Executando o seu Broker

Para executar o seu broker, vamos voltar para o arquivo package.json, e vamos modificar o `scripts` para:
```json
  "scripts": {
    "start": "node broker.js"
  },
```
Após salvar o `package.json`, vá ao terminal, aberto na pasta do projeto, e execute o comando:
```bash
C:\Users\user\Desktop\mqtt_broker> npm start
```

