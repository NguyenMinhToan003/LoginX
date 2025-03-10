import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

export const twitterStrategy = () => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.HOST_CALLBACK_PASSPORT}/api/auth/twitter/callback`,
    scope: ['user:email'],
    propmt: 'consert'
  },
  (token, tokenSecret, profile, cb) => {
    // Lưu thông tin người dùng vào cơ sở dữ liệu hoặc session
    
    return cb(null, profile); // Lưu profile người dùng vào session
  }));
};
