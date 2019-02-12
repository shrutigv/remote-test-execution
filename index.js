// SGV - Express API to run Test Scripts on the server
const express = require('express');
const spawn = require('child_process').exec;
const http = require('http');
const path = require('path');
const app = express();
const HTTP_PORT =  5000;

let server = {};

server.createHttpServer = (app) => {
    return http.createServer(app);
}

app.get('/', (request, response)=>{
    var dirPath=path.join(__dirname,'../..','myagent','work','11','s');
    const ls = spawn('cd /home/philips/myagent/_work/11/s && npm test');
    console.log('Server started !!');
    response.status(200).send('server started succesfully');      
    
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      response.status(500).send(data);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
});


app.listen(HTTP_PORT, () => console.log(`Test Runner App listening on port ${HTTP_PORT}!`));