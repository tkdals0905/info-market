import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwt: {
    secret_key: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
  kakao: {
    client_key: process.env.KAKAO_CLIENT_KEY,
    admin_key: process.env.KAKAO_ADMIN_KEY,
    test_cid: process.env.KAKAO_TEST_CID,
  },
  imp: {
    imp_code: process.env.IMP_CODE,
    imp_key: process.env.IMP_KEY,
    imp_secret: process.env.IMP_SECRET,
    imp_cid: process.env.IMP_CID,
  },
};
