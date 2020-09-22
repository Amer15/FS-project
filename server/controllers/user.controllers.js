const User = require('../models/user.models');
const Order = require('../models/order.models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
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



exports.getUserById = (req, res, next, id) => {
    // console.log(id)
    User.findById({ _id: id }, { salt: 0, encrypted_password: 0, createdAt: 0, updatedAt: 0 }).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        if (!user) return res.status(400).json({
            error: 'user does not exist'
        });

        req.profile = user;
        req.user = user._id;
        next();
    })
};

exports.getUser = (req, res) => {
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    const { _id } = req.profile;
    User.findByIdAndUpdate(
        { _id },
        { $set: req.body },
        { new: true, useFindAndModify: false }
    ).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        return res.json({
            message: 'successfully updated',
            user
        });
    })
};


//Update PASSWORD
exports.updatePassword = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email, password);
    User.findOne({ email }).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        if (!user) return res.status(400).json({
            error: 'User doesnot exist with this email'
        });

        //Genarate salt and encrypt password
        const salt = uuidv4();
        const newPassword = crypto.createHmac('sha256', salt)
            .update(password)
            .digest('hex');

        user.update({ $set: { salt: salt, encrypted_password: newPassword } }).exec((err, user) => {
            if (err) return res.status(400).json({
                error: 'something went wrong'
            });

            return res.json({
                message: 'Password updated successfully'
            });
        })
    });

}

//Update USERNAME
exports.updateUserName = (req, res) => {
    const { email, name } = req.body;
    console.log(req.body);
    console.log(email, name);
    User.findOne({ email }).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        if (!user) return res.status(400).json({
            error: 'User doesnot exist with this email'
        });

        user.update({ $set: { name: name } }).exec((err, user) => {
            if (err) return res.status(400).json({
                error: 'something went wrong'
            });

            return res.json({
                message: 'Username updated successfully',
                user
            });
        })
    });

}

//Forgot PASSWORD
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong'
        })

        if (!user) return res.status(400).json({
            error: 'User does not exist with this email.'
        })

        const token = jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_KEY, {
            expiresIn: '30m'
        });

        const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

        //For sending through Gmail
        var mailOptions = {
            from: process.env.GM_ID,
            to: email,
            subject: 'Forgot Password',
            html: `
            <div>
            <h1 style="background-color: #10A881; color: white; text-align:center; padding:10px; font-family:Arial, Helvetica, sans-serif">Please use the following link to reset your password</h1>
            <br/>
             <button style="margin:2px auto;padding:10px 18px; background:#0A3D62;letter-spacing:1px; cursor:pointer; outline:none; border:none; border-radius:4px"><a href=${resetPasswordLink} target="_blank" style="text-decoration: none; color: white">Reset Password</a></button>

            <hr/>
            <h4 style="text-align:center; color: steelblue">This email contains sensitive information.</h4>
            <p style="align-self:center;color: #192A56; font-family:Impact, Charcoal, sans-serif;letter-spacing:1px;">NOTE: link is valid for only 30 minutes.</p>
            <br/>
            <a href=${process.env.CLIENT_URL} target="_blank" style="align-self:center">Go to Tshirt Store</a>
           </div>
            `
        }

        //Send Email
        transport.sendMail(mailOptions, (err, info) => {
            if (err) return res.status(400).json({
                error: 'something went wrong. Could not send email.'
            })

            return res.json({
                message: `Email has been sent successfully to ${email}. Please follow the instructions provided in the email to reset password.`
            })
        });
    })
}

//Reset PASSWORD
exports.resetPassword = (req, res) => {
    const { token, password } = req.body;
    // console.log(token, password);

    if (!token || !password) return res.status(400).json({
        error: 'token or password is missing. Failed to proceed reset password.'
    });

    if (token) {
        return jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY, (err) => {
            if (err) return res.status(400).json({
                error: 'token expired.'
            });

            const { email } = jwt.decode(token);

            User.findOne({ email }).exec((err, user) => {
                if (err) return res.status(400).json({
                    error: 'something went wrong.'
                });

                if (!user) return res.status(400).json({
                    error: 'User with the provided email does not exist.'
                });

                // Generate salt and hash password 
                const salt = uuidv4();
                const newPassword = crypto.createHmac('sha256', salt)
                    .update(password)
                    .digest('hex');

                user.update({ $set: { salt: salt, encrypted_password: newPassword } }).exec((err, user) => {
                    if (err) return res.status(400).json({
                        error: 'something went wrong. failed to update password.'
                    });

                    return res.json({
                        message: 'Your password is successfully updated.'
                    })
                })


            })
        })
    }


}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('User', '_id name')
        .exec((err, list) => {
            if (err) return res.status(400).json({
                error: `No products found in the User's purchase list`
            });

            return res.json(list);
        })
};

//Middleware to update user's purchases
exports.updateUserPurchaseList = (req, res, next) => {

    let purchases = [];
    req.body.products.forEach(product => {
        const { _id, name, description, category, quantity } = product;
        purchases.push({
            _id,
            name,
            description,
            category,
            quantity,
            amount: req.body.amount,
            transaction_id: req.body.transaction_id
        });
    });

    //Store purchases in DB(User)
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) return res.status(400).json({
                error: 'failed to update purchase list'
            });

            next();
        }
    );
};