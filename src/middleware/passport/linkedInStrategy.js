import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import passport from 'passport';

export const linkedInStrategy = () => {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: '/api/auth/linkedin/callback',
        scope: ['email', 'profile','openid'],
        state: true
      },
      function (accessToken, refreshToken, profile, done) {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        console.log('profile', profile);
        return done(null, profile);
      });
    }
    )
  );
};