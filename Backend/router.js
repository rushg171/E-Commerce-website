const express = require('express');
const controller = require('./controllers');
const auth = require('./auth.controller');
const router = express.Router();

router.get('/', controller.home);
router.all('/sofa', controller.sofa);
router.all('/signup', auth.signup);
router.all('/signin', auth.signin);
router.all('/changepassword', auth.changePassword);
router.all('/viewcart', controller.cart);

module.exports = router;
