const User = require('../models/user.models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const nodemailer = require('nodemailer');



//mailtrap transport for nodemailer
//MailTrap for testing Emails
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: process.env.MAILTRAP_ID,
//         pass: process.env.MAILTRAP_PASS
//     }
// });


//Using Gmail
var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GM_ID,
        pass: process.env.GM_PASS
    }
});



exports.signUp = (req, res) => {

    const errors = validationResult(req);

    //checking Errors (express-validators)
    //Throw our custom error msgs (express-validators)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg
        });
    }

    const { name, email, password } = req.body;

    //Check if same email exists in DB
    User.findOne({ email: email }).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        if (user) return res.json({
            error: 'user already exist with this email'
        });


        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION_KEY, {
            expiresIn: '30m'
        });

        

        const activationLink = `${process.env.CLIENT_URL}/account/activate/${token}`;
        


        //creating email template (FOR TESTING)
        // const emailTemplate = {
        //     to: [
        //         {
        //             address: email,
        //             name: name
        //         }
        //     ],
        //     from: {
        //         address: process.env.EMAIL_FROM,
        //         name: 'TSHIRT STORE LTD'
        //     },
        //     subject: 'Account activation Link',
        //     html: `
        //     <div style="display:flex; flex-direction:column">
        //     <h1 style="background-color: #2B2B52; color: white; text-align:center; padding:10px; font-family:Arial, Helvetica, sans-serif">Please use the following link to activate account</h1>
        //     <br/>
        //      <button style="align-self:center;padding:10px 18px; background:#0A79DF;letter-spacing:1px; cursor:pointer; outline:none; border:none; border-radius:4px"><a href=${activationLink} target="_blank" style="text-decoration: none; color: white">Activate Now</a></button>
   
        //     <hr/>
        //     <h4 style="text-align:center; color: steelblue">This email contains sensitive information.</h4>
        //     <p style="align-self:center;color: #192A56; font-family:Impact, Charcoal, sans-serif;letter-spacing:1px;">NOTE: link is valid for only 30 minutes.</p>
        //     <br/>
        //     <a href=${process.env.CLIENT_URL} target="_blank" style="align-self:center">Go to Site</a>
        //    </div>
        // `
        // }

        //For sending through Gmail
        var mailOptions = {
            from: process.env.GM_ID,
            to: email,
            subject: 'Account Activation',
            text:`Account activation link ${activationLink}`
        }

        transport.sendMail(mailOptions, (err, result) => {
            if (err) return res.status(400).json({
                error: 'something went wrong. Could not send email.'
            });

            return res.json({
                message: `Email has been sent successfully to ${email}. Please follow the instructions provided in the email to activate your account.`
            });
        });

        //Send account activation mail (For Mailtrap TESTING)
        // transport.sendMail(emailTemplate, (err, result) => {
        //     if (err) return res.status(400).json({
        //         error: 'something went wrong. Could not send email.'
        //     });

        //     return res.json({
        //         message: `Email has been sent successfully to ${email}. Please follow the instructions provided in the email to activate your account.`
        //     });
        // })
    });
}


exports.activateAccount = (req, res) => {
    const { token } = req.body;
    console.log('token: ' + token);

    if (token) {
        return jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION_KEY, (err) => {
            if (err) return res.status(400).json({
                error: 'token expired. Please signup again.'
            });

            const { name, email, password } = jwt.decode(token);

            User.findOne({email: email}).exec((err, user) => {
                if(err) return res.status(400).json({
                    error: 'Something went wrong'
                });

                if(user) return res.status(400).json({
                    error: 'Already activated account. Please sign in.'
                });

                const userModel = new User();
                userModel.name = name;
                userModel.email = email;
                userModel.password = password;


                userModel.save((err, user) => {
                    if (err) return res.status(400).json({
                        error: 'Something went wrong. Could not save user!'
                    });
        
                    return res.json({
                        message: 'Successfully activated account. Please sign in',
                        name: user.name,
                        email: user.email,
                        id: user._id
                    });
                })
            })  
        })
    }
    else {
        return res.status(400).json({
            error: 'token doesnot exist'
        });
    }
}


exports.signIn = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    //checking Errors (express-validators)
    //Throw our custom error msgs (express-validators)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg
        });
    }

    User.findOne({ email }).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        if (!user) return res.status(400).json({
            error: 'User does not exist!'
        });

        //Check password
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Password does not match'
            });
        }

        // Generate Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        //Store token in Cookie 
        res.cookie('token', token);

        const { name, email, _id, role } = user;

        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role
            }
        })
    })
}


exports.signOut = (req, res) => {
    res.clearCookie('token');

    return res.json({
        message: 'Signed out successfully'
    });
}


//Proteced route 
//We are using expressJwt to pull out the payload (id) we have used in while creating token
//This method decodes jwt on the go and attaches an object to the req header with decoded jwt. Here we named that object as 'token' , it contains decoded jwt
exports.isSignedIn = expressJwt({
    secret: 'hjhdsfdvdhjsbhbasgyfcvgvhsabhbhuiyadsgba',
    algorithms: ['HS256'],
    userProperty: 'token'
});


// custom middleware 
//This method recieves token object and profile obj. one is coming from isSignedIn middleware(token obj) and other is from getUserById middleware(profile obj)
exports.isAuthenticated = (req, res, next) => {
    let isChecked = req.profile && req.token && req.profile._id == req.token.id;
    if (!isChecked) {
        return res.status(403).json({
            error: 'Access Denied'
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Access Denied, Only Admin is allowed'
        });
    }
    next();
}