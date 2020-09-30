const express = require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express();

server.use(express.json())




//custom middleware

function logger(req, res, next) {
  console.log(  `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('host')}`	  );
 //res.status(200).json();
 next();
		}


server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.get('/api/users', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



module.exports = server;
