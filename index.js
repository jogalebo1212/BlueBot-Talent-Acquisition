'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require('axios');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function skillsPeople(agent){
    let Name=agent.parameters["Name"];
    let python=agent.parameters["python"];
    let sql=agent.parameters["sql"];
    let ml=agent.parameters["ml"];
    let r=agent.parameters["r"];
    let hadoop=agent.parameters["hadoop"];
    let tableau=agent.parameters["tableau"];
    let sas=agent.parameters["sas"];
    let spark=agent.parameters["spark"];
    let java=agent.parameters["java"];
    let Others=agent.parameters["Others"];
    let CBS=agent.parameters["CBS"];
    let IS=agent.parameters["IS"];
    let BFS=agent.parameters["BFS"];
    let HC=agent.parameters["HC"];
    let Insurance=agent.parameters["Insurance"];
    let Other_industries=agent.parameters["Other_industries"];
    axios.post("https://sheetdb.io/api/v1/iepvhisbpj0kk", {Name,python,sql,ml,r,hadoop,tableau,sas,spark,java,Others,CBS,IS,BFS,HC,Insurance,Other_industries});
    agent.add("Fuiste registrado de manera exitosa...");
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('requirementsPeople', skillsPeople);
  
  agent.handleRequest(intentMap);
});
