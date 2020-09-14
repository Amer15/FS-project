const express = require('express');
const router = express.Router();
const { signUp, activateAccount, signIn, isSignedIn } = require('../controllers/auth.controllers');
const { check } = require('express-validator');


router.post('/signup',[
    check('name').isLength({ min: 3 }).withMessage('name must me atleast 3 characters long'),
    check('email').isEmail().withMessage('email must be valid'),
    check('password').isLength({ min: 4 }).withMessage('password must be atleast 4 characters long')
], signUp);

router.post('/activate/account', activateAccount);

router.post('/signin',[
    check('email').isEmail().withMessage('email must be valid'),
    check('password').isLength({ min: 2 }).withMessage('password is required')
], signIn);


// router.get('/test', isSignedIn, (req, res) => {
//     res.send('Proteced route')
// });


module.exports = router;