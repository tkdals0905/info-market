import * as userDb from '../db/user';
import { Request, Response } from 'express';
const bcrypt = require('./functions/bcrypt');
import * as infoDb from '../db/info';
import * as paymentDb from '../db/payment';
import * as pointDb from '../db/point';
import * as pointRefundDb from '../db/pointRefund';

module.exports = {
  getUsersInfo: async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (userId != req.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res
        .status(406)
        .json({ message: '해당 유저가 존재하지 않습니다.' });
    }

    return res.status(200).json({ user, message: '유저 정보를 가져왔습니다.' });
  },

  editUsersInfo: async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (userId != req.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res
        .status(406)
        .json({ message: '해당 유저가 존재하지 않습니다.' });
    }

    let email: string;
    let password: string;
    let phone: string;
    let nickname: string;

    if (req.body.email) {
      email = req.body.email;
    } else {
      email = user.email;
    }

    if (req.body.password) {
      password = await bcrypt.hash(req.body.password).catch((err: Error) => {
        console.log(err);
      });
    } else {
      password = user.password;
    }

    if (req.body.phone) {
      phone = req.body.phone;
    } else {
      phone = user.phone;
    }

    if (req.body.nickname) {
      nickname = req.body.nickname;
    } else {
      nickname = user.nickname;
    }

    await userDb
      .editUserInfo(Number(userId), email, password, nickname, phone)
      .catch(() => {
        return res
          .status(400)
          .json({ message: '회원 정보를 수정하는데 실패했습니다.' });
      });

    return res.status(200).json({ message: '유저 정보를 수정 했습니다.' });
  },

  usersWriteInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const { userId } = req;

    // console.log('userId : ', userId);

    const info = await infoDb.getMyInfos(
      Number(pages),
      Number(limit),
      Number(userId),
    );

    if (info.count === 0) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    return res
      .status(200)
      .json({ info, message: '내가 쓴 게시물을 불러왔습니다.' });
  },

  usersOrderInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const state: string = 'paid';
    const findOrders = await paymentDb.getPayments(
      Number(req.userId),
      Number(pages),
      Number(limit),
      state,
    );

    if (findOrders.count === 0) {
      return res.status(400).json({ message: '구매한 게시물이 없습니다.' });
    }

    return res.status(200).json({
      info: findOrders,
      message: '내가 구매한 게시물을 불러왔습니다.',
    });
  },
  usersRefundInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const state: string = 'refund';
    const findOrders = await paymentDb.getPayments(
      Number(req.userId),
      Number(pages),
      Number(limit),
      state,
    );

    if (findOrders.count === 0) {
      return res.status(400).json({ message: '환불한 게시물이 없습니다.' });
    }

    return res.status(200).json({
      info: findOrders,
      message: '내가 환불한 게시물을 불러왔습니다.',
    });
  },
  postImg: async (req: Request, res: Response) => {
    const { profileImg } = req.body;
    const { userId } = req;
    if (!profileImg) {
      return res.status(400).json({ message: '이미지 파일이 없습니다.' });
    }

    await userDb.postImg(profileImg, Number(userId));
    return res
      .status(200)
      .json({ message: '이미지를 업로드 하는데 성공하였습니다.' });
  },
  checkNickname: async (req: Request, res: Response) => {
    const findNickname = await userDb.checkNickname(req.body.nickname);

    if (findNickname) {
      return res.status(400).json({ message: '중복된 닉네임 입니다.' });
    }

    return res.status(200).json({ message: '사용할 수 있는 닉네임 입니다.' });
  },
  paidPoint: async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (userId != req.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res
        .status(406)
        .json({ message: '해당 유저가 존재하지 않습니다.' });
    }

    const paidPoint = await pointDb.findUserPaidbyUserId(Number(userId));

    if (!paidPoint) {
      return res
        .status(406)
        .json({ message: '포인트를 충전한 내역이 없습니다.' });
    }

    return res
      .status(200)
      .json({ paidPoint, message: '포인트 충전 내역을 불러왔습니다.' });
  },
  checkEmail: async (req: Request, res: Response) => {
    const editInfo = await userDb.findUser(req.body.email);

    if (editInfo) {
      return res.status(400).json({ message: '중복된 Email 입니다.' });
    }

    return res.status(200).json({ message: '사용할 수 있는 Email 입니다.' });
  },
  getRefundPoint: async (req: Request, res: Response) => {
    const refundPoint = await pointRefundDb.findRefund(Number(req.userId));

    if (!refundPoint) {
      return res.status(406).json({ message: '포인트 환불 내역이 없습니다.' });
    }

    return res.status(200).json({
      refund: refundPoint,
      message: '포인트 환불 내역을 불러왔습니다.',
    });
  },
};
