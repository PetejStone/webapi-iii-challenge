
const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const server = express();
const Users = require('./users/userDb.js')

//global middleware
server.use(express.json());
server.use(helmet());
server.use(logger)
//server.use('/api/users', postsRouter)

//custom middleware
const validateUserId = ( async ( req, res, next) => {
  const id = await Users.getById(req.params.id);
if (id) {
  req.user = id
  next()
} else {
  res.status(500).json({message: "Invalid user id"})
}
});


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.get('/users', (req, res) => {
  Users.get()
  .then(user => {
    res.status(200).json({user})
  })
  .catch(err => {
    res.status(500).json({error: "Users could not be retrieved"})
  })
})

server.get('/users/:id', validateUserId, async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    
      res.status(200).json(user);
    
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
});

function logger(req, res, next) {
  console.log(`${req.method} was requested at ${req.url} on [${new Date().toISOString()}]`)
  next();
};


module.exports = server;
