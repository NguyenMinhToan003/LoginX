import GitHubStrategy from 'passport-github2'
import passport from 'passport'

export const gitHubStrategy = () => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `${process.env.HOST_CALLBACK_PASSPORT}/api/auth/github/callback`,
    // scope: ['user:email'],
    // prompt: 'consent'
  },
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
  }
));
}