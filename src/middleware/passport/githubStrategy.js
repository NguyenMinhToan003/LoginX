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
      },
      (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile)
      }
    )
  );
};