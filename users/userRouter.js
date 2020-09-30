const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const thisUser = req.body
  Users.insert(thisUser)
  .then(user => {
    res.status(201).json({user: thisUser})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: 'Error adding user'})
  })
 
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const{text} = req.body;
  const id = req.params.id;
  const post = {text: text, user_id: id}

  Posts.insert(post)
  .then(updatedPost => {
    res.status(210).json(updatedPost)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({errorMessage: "Error updating post"})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
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
  Users.getById(req.params.id)
    .then(user => {
      if(user){
        res.status(200).json(user)
      }else{
        res.status(404).json({message: "User not found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error finding user"})
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  
  Users.getUserPosts(req.params.id)
    .then(post => {
      if(post){
        console.log(post)
        res.status(200).json(post)
      }else{
        res.status(404).json({message: "Users not found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error finding post"})
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(user => {
    if(user >0){
      res.status(200).json({message: "user has been removed"})
    }else{
      res.status(404).json({message: "User not found"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ errorMessage: "Error removing user"})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user => {
    if(user){
      res.status(200).json({message: "user updated"})
    }else{
      res.status(404).json({message: "User not found"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({errorMessage: "Error updating user"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  if(!id){
    res.status(400).json({message: "check your id"})

  }else{
    req.user = id
  }
  next()
}

function validateUser(req, res, next) {
  // do your magic!
  const {name} = req.body
  if(!name){
    res.status(400).json({message: "check your user name"})
  }
  next()
}


function validatePost(req, res, next) {
  // do your magic!
  const {text} = req.body
 if(!text){
  res.status(400).json({message: 'check your post'})
 }
 next()
}

module.exports = router;
