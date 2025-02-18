import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

export const twitterStrategy = () => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:8123/api/auth/twitter/callback'
  },
  (token, tokenSecret, profile, done) => {
    // Lưu thông tin người dùng vào cơ sở dữ liệu hoặc session
    return done(null, profile); // Lưu profile người dùng vào session
  }));

  passport.serializeUser((user, done) => {
    done(null, user); // Lưu thông tin người dùng vào session
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj); // Khi lấy lại thông tin người dùng từ session
  });
};
