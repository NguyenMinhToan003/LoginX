import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

export const googleStrategy = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST_CALLBACK_PASSPORT}/api/auth/google/callback`,
    // scope: ['user:email'],// Để yêu cầu quyền truy cập email của người dùng
    // prompt: 'consent'// Để yêu cầu người dùng xác nhận quyền truy cập mỗi lần đăng nhập
  },
  (token, tokenSecret, profile, cb) => {
    // Lưu thông tin người dùng vào cơ sở dữ liệu hoặc session
    console.log('profile', profile);
    return cb(null, profile); // Lưu profile người dùng vào session
  }));
};
