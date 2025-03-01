import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

export const twitterStrategy = () => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.PORT}/api/auth/twitter/callback`,
    scope: ['user:email'],
    propmt: 'consert'
  },
  (token, tokenSecret, profile, cb) => {
    // Lưu thông tin người dùng vào cơ sở dữ liệu hoặc session
    
    return cb(null, profile); // Lưu profile người dùng vào session
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user); // Lưu thông tin người dùng vào session
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj); // Khi lấy lại thông tin người dùng từ session
  });
};
