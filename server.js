
const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const server = express();


//global middleware
server.use(express.json());
server.use(helmet());
server.use(logger)

//custom middleware


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


function logger(req, res, next) {
  console.log(`${req.method} was requested at ${req.url} on [${new Date().toISOString()}]`)
  next();
};


module.exports = server;
