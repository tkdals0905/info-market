import express from 'express';
const router = express.Router();
const usersControllers = require('../controlloers/users');
const auth = require('../middlewares/auth');

router.get('/:userId', auth.me, usersControllers.getUsersInfo);
router.put('/:userId', auth.me, usersControllers.editUsersInfo);
router.get('/userinfo/:userId', auth.me, usersControllers.usersWriteInfo); // 403 에러 왜 났는지 찾기
router.get('/info/order', auth.me, usersControllers.usersOrderInfo);
router.get('/info/refund', auth.me, usersControllers.usersRefundInfo);
router.post('/:userId/img', auth.me, usersControllers.postImg);
router.post('/nickname', usersControllers.checkNickname);
router.get('/:userId/point', auth.me, usersControllers.paidPoint);
router.post('/email', usersControllers.checkEmail);
router.get('/:userId/pointRefund', auth.me, usersControllers.getRefundPoint);

module.exports = router;
