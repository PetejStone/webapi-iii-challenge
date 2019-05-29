
const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const server = express();
const Users = require('./users/userDb.js')
const Posts = require('./posts/postDb.js')

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
  res.status(400).json({message: "Invalid user id"})
}
});

function validateUser(req, res, next) {
  //console.log(Object.keys(req.body).length)
  const bodyLength = Object.keys(req.body);//converts object to array to get length
  const username = req.body;
  if (req.body && req.body.name) {
    next();
  }
  if (bodyLength.length <= 0)  {
    res.status(400).json({message: 'missing user data'})
  }
  if ( !username.name ) {
    res.status(400).json({message: 'missing required name field'})
  }
  
}

function validatePost(req, res, next) {
  //console.log(Object.keys(req.body).length)
  const bodyLength = Object.keys(req.body);//converts object to array to get length
  const username = req.body;
  if (req.body && req.body.text) {
    next();
  }
  if (bodyLength.length <= 0)  {
    res.status(400).json({message: 'missing post data'})
  }
  if ( !username.text ) {
    res.status(400).json({message: 'missing required text field'})
  }
  
}

//////END OF MIDDLEWARE


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

server.get('/users/:id/posts',  async (req, res) => {
  try {
    const id = await Users.getUserPosts(req.params.id);
      res.status(200).json(id);
    
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
});

server.post('/users', validateUser, async(req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
})

server.post('/users/:id/posts', validatePost, async(req, res) => {
  //const postInfo = {...req.body, user_id: req.params.id}
  const messageInfo = { ...req.body, user_id: req.params.id };

    try {
      const message = await Posts.insert(messageInfo);
      res.status(210).json(message);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the messages for the hub',
      });
    }
})


function logger(req, res, next) {
  console.log(`${req.method} was requested at ${req.url} on [${new Date().toISOString()}]`)
  next();
};


module.exports = server;
