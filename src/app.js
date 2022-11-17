const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const passport = require("passport");
const PassportLocal = require("passport-local");
const PassportJWT = require("passport-jwt");

const { User } = require("./db");
const { LinkedInStrategy, LINKEDIN_OPTIONS } = require("./auth/linkedin.js");
const { JWT_SECRET } = process.env;

passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) =>
    {
      try
      {
        const userFound = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!userFound)
        {
          return done(null, false);
        }
        if (userFound.password !== password)
        {
          return done(null, false);
        }
        return done(null, userFound);
      } catch (error)
      {
        done(error);
      }
    }
  )
);

passport.use(
  new PassportJWT.Strategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  }, (payload, done) =>
  {
    try
    {
      done(null, payload)
    } catch (error)
    {
      done(error)
    }
  })
);

passport.use(
  new LinkedInStrategy(LINKEDIN_OPTIONS,
    (accessToken, refreshToken, profile, done) =>
    {
      process.nextTick(async () =>
      {
        const email = profile.emails[0].value;
        const user = await User.findOne({
          where: { email }
        });
        if (user)
          return done(null, user);
        else
          return done(Error('Usuario no existe'));
      });
    }
  )
);

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use((req, res, next) =>
{
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60,
    },
  })
);
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function (user, done)
{
  if (user.password)
  {
    delete user.password;
  }
  done(null, user.id);
});
passport.deserializeUser(function (id, done)
{
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) =>
    {
      done(null, user);
    })
    .catch((err) =>
    {
      return done(err);
    });
});

server.use((req, res, next) =>
{
  console.log(req.session);
  console.log(req.user);
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) =>
{
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});

module.exports = server;
