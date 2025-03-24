import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { userModel } from '~/models/userModel';

export const twitterStrategy = () => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.HOST_CALLBACK_PASSPORT}/api/auth/twitter/callback`,
    // scope: ['user:email'],// Để yêu cầu quyền truy cập email của người dùng
    // prompt: 'consent'// Để yêu cầu người dùng xác nhận quyền truy cập mỗi lần đăng nhập
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, cb) => {
        try {
          const clientId = req.session.clientId
          if (clientId) {
            const user = await userModel.findUserByIdSocial(profile.id);
            if (!user) {
              await userModel.addSocial(clientId, profile.id,'twitter');
              return cb(null, {
                id: clientId, idSocial: profile.id, ...profile,
                code:2
              });
            }
            return cb(null, {
              ...user,
              code:1
            });
          }
          return cb(null, {...profile, code:0});
        } catch (err) {
          return cb(err);
        }
      }
    )
  );
};
