const express = require('express');
const SignUp=require('../controllers/signup.js');
const router = express.Router();

router.post('/signup',SignUp);

module.exports=router



