import GitHubStrategy from 'passport-github'
import passport from 'passport'

export const gitHubStrategy = () => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:8123/api/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('>>>>>>>>>> controler', profile) 
    return cb(null, profile);
  }
));
}