import GitHubStrategy from 'passport-github2';
import passport from 'passport';
import { userModel } from '~/models/userModel';

export const gitHubStrategy = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: `${process.env.HOST_CALLBACK_PASSPORT}/api/auth/github/callback`,
        scope: ['user:email'],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        try {
          const clientId  = req.query.state
          if (clientId) {
            const user = await userModel.findUserByIdSocial(profile.id);
            if (!user) {

              await userModel.addSocial(clientId, profile.id,'github');
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