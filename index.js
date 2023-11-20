const express = require("express");
const { default: mongoose } = require("mongoose");
const CategoryRouters = require("./routes/Category");
const BrandRouters = require("./routes/Brand");
const AdminRouters = require("./routes/Admin");
const UserRouters = require("./routes/User");
const ProductRouters = require("./routes/Product");
const OrderRouters = require("./routes/Order");
const CartRouters = require("./routes/Cart");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const server = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { User } = require("./Model/User");
const { Admin } = require("./Model/Admin");
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { isAuth, sanitizeUser, cookieExtractor } = require("./Services/Comman");
const PORT = process.env.PORT;
const URI = process.env.URI;

//JWT options

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

// middleware
server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use(express.static("build"));

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(passport.authenticate("session"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(URI);
  console.log("database Connected");
}

server.use("/brands", BrandRouters);
server.use("/category", CategoryRouters);
server.use("/admin", AdminRouters);
server.use("/user", UserRouters);
server.use("/orders", OrderRouters);
server.use("/cart",  CartRouters);
server.use("/products", ProductRouters);

// Passport Strategy

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "Invalid Credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          console.log({ user });
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "Invalid Credentials" });
          } else {
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            done(null, { token });
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

// Passport admin Strategy

passport.use(
  "localadmin",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const admin = await Admin.findOne({ email: email }).exec();
      console.log(email);
      if (!admin) {
        console.log("hit1")
        done(null, false, { message: "Invalid Credentials" });
      }
      console.log(admin);
      crypto.pbkdf2(
        password,
        admin.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          console.log("1");
          if (!crypto.timingSafeEqual(admin.password, hashedPassword)) {
            console.log("2");
            done(null, false, { message: "Invalid Credentials" });
          } else {
            const token = jwt.sign(sanitizeUser(admin), SECRET_KEY);
            console.log("3");
            console.log(token)
            done(null, { token });
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

// JWT Strategy

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // This calls Serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

// JWT admin strategy

passport.use(
  "jwtadmin",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const admin = await Admin.findById(jwt_payload.id);
      if (admin) {
        console.log(admin)
        return done(null, sanitizeUser(admin)); // This calls Serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

// Jwt owner strategy

passport.use(
  "jwtowner",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const owner = await User.findById(jwt_payload.id);
      if (owner.role == "owner") {
        console.log(owner)
        return done(null, sanitizeUser(owner)); // This calls Serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);



//   serialize & deserrialize User

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
