require("dotenv").config();
const Linkedin = require("passport-linkedin-oauth2");

const LinkedInStrategy = Linkedin.Strategy;

const LINKEDIN_OPTIONS = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://proyecto-final-29b-backend-production.up.railway.app/user/linkedin/callback',
    scope: ["r_emailaddress", "r_liteprofile"]
}

module.exports = { LinkedInStrategy, LINKEDIN_OPTIONS };