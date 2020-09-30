const express = require('express');
const Posts = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Posts.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: 'Error adding user'})
  })
 
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then(post => {
      res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error retrieving users'})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
    .then(user => {
      if(user){
        res.status(200).json(user)
      }else{
        res.status(404).json({message: "User not found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error adding user"})
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
