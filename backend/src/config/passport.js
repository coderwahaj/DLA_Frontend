const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
const config = require('./config');

// JWT Strategy for protecting routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);
    
    if (!user || !user.isActive) {
      return done(null, false);
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this Google ID
      let user = await User.findOne({ 
        where: { googleId:  profile.id } 
      });

      if (user) {
        // Update last login
        user.lastLogin = new Date();
        await user. save();
        return done(null, user);
      }

      // Check if user exists with this email (linking accounts)
      user = await User. findOne({ 
        where:  { email: profile.emails[0].value } 
      });

      if (user) {
        // Link Google account to existing user
        user. googleId = profile.id;
        user.authProvider = 'google';
        user.isEmailVerified = true;
        user.profilePicture = profile.photos[0]?.value;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      // Create new user
      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails[0]. value,
        firstName: profile. name.givenName,
        lastName: profile.name.familyName,
        authProvider: 'google',
        isEmailVerified: true,
        profilePicture: profile.photos[0]?.value,
        lastLogin: new Date()
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user. id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;