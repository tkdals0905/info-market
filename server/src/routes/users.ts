import express from 'express';
const router = express.Router();
const usersControllers = require('../controlloers/users');
const auth = require('../middlewares/auth');

router.get('/:userId', auth.me, usersControllers.getUsersInfo);
router.put('/:userId', auth.me, usersControllers.editUsersInfo);
router.get('/info', auth.me, usersControllers.usersWriteInfo);
router.get('/info/order', auth.me, usersControllers.usersOrderInfo);
router.get('/info/refund', auth.me, usersControllers.usersRefundInfo);

module.exports = router;