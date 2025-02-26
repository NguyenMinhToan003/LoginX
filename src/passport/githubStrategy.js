import GitHubStrategy from 'passport-github'
import passport from 'passport'

export const gitHubStrategy = () => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:8123/api/auth/github/callback',
    scope: ['user:email'],
    propmt: 'consert'
  },
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
  }
));
}