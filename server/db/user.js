const User = require('../models/user');

module.exports = {
  findUsers: async (pages, limit) => {
    return await User.findAndCountAll({
      limit: Number(limit),
      offset: (pages - 1) * 10,
    });
  },
  findPkUser: async (userId) => {
    return await User.findByPk({
      where: {
        id: userId,
      },
    });
  },
  editUserInfo: async (userId, email, nickname, point, grade) => {
    const user = await User.update(
      {
        email,
        nickname,
        point,
        grade,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    return user;
  },
  removeUser: async (userId) => {
    return await User.destroy({
      where: {
        id: userId,
      },
    });
  },
  findUser: async (email) => {
    return await User.findOne({ where: { email } });
  },
  createUser: async (email, hashPw, nickname, phone) => {
    return await User.create({
      email,
      password: hashPw,
      nickname,
      phone,
    });
  },
};
