const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/appError');


exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 12).then(hash => {
    const user =  new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
       message: 'User created',
       result: result
      });
    }).catch(err => {
      res.status(500).json({
       error: err
      });
    });
  });
};


exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer', { expiresIn: '1h'});
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  }).catch(err => {
    return res.status(401).json({
      message: 'Auth failed'
    });
  });
};

exports.logout = (req, res) => {
   res.cookie('jwt', 'loggedout', {
     expires: new Date(Date.now() + 10 * 1000),
     httpOnly: true
   });
   res.status(200).json({ status: 'success'});
};

exports.forgetPassword = (req, res, next) => {
   const user = User.findOne({ email: req.body.email });
   if (!user) {
     return next(new AppError('There is no user with email address', 404))
   }

   const resetToken = user.createPasswordResetToken();
   user.save({ validateBeforeSave: false});

   try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`;
    new User(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
   } catch (error) {
     user.passwordResetToken = undefined;
     user.passwordResetExpires = undefined;
     user.save({ validateBeforeSave: false });

     return next(new AppError('There was an error sending the email, Try again later!'), 500);
   }
};

exports.resetPassword = (req, res, next) => {
   const hashedToken  = crypto.createHash('sha256').update(req.params.token).digest('hex');

   const user = User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});

   if (!user) {
     return next(new AppError('Token is invalid or has expired', 400));
   }

  user.password = req.body.password;
  user.passwordRestToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();

  const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer', { expiresIn: '1h'});
  res.status(200).json({
    token: token,
    expiresIn: 3600,
    userId: fetchedUser._id
  });
};

