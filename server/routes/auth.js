import express from "express"
import bodyParser from "body-parser"
import notify from "../notifications/notifier.js"

// model imports
import User from "../models/User.model.js";
import Family from "../models/Family.model.js";

// passport
import passport from "../auth/LocalStrategy.js";
import userAuthenticated from "../auth/Authentication.js";

const authRoutes = express.Router();
authRoutes.use(bodyParser.urlencoded({
  extended: true
}));

authRoutes.use(passport.authenticate('session'))
  
authRoutes.post("/register", (req, res) => {
    const { username, joinCode, password } = req.body;

    if (!username || !password) {
        return res.send("One or more required fields missing.");
    }

    User.findOne({ username: username }, (err, user) => {
        if (err) {
        return res.send(err);
        }

        if (user) {
        return res.send("Username already exists.");
        }

        if (joinCode) {
        // user to join family

        Family.findOne({ joinCode: joinCode }, (err, family) => {
            if (err) {
            return res.send(err);
            }

            if (!family) {
            return res.send("Join code invalid.");
            } else {
            const user = new User({
                username: username,
                password: password,
                family: family._id,
            });
            family.members.push(user._id);

            // notify family

            const familyMembers = [...family.members]
            familyMembers.splice(familyMembers.indexOf(user._id), 1)

            notify(user._id, "has joined your family.", familyMembers)

            // end notify

            family.save();
            user.save((err) => {
                if (err) {
                return res.send(err);
                } else {
                return res.status(200).send(user);
                }
            });
            }
        });
    } else {
    // user to create family

    const family = new Family();
    // code generation
    // TODO: actual unique code generation algorithm
    let familyID = family._id.toString();
    let code = familyID.substring(familyID.length - 6);

    family.joinCode = code;

    const user = new User({
        username: username,
        password: password,
        family: family._id,
    });

    family.members.push(user._id);

    family.save();
    user.save((err) => {
        if (err) {
        return res.send(err);
        } else {
        return res.status(200).send(user);
        }
    });
    }
});
});

authRoutes.post("/login",
  passport.authenticate('local'),
  (req, res) => {

    // set up current session
    req.session.user = {
      id: req.user.id,
      username: req.user.username,
      familyID: req.user.family
    }
    
    console.log(`'${req.session.user.username}' logged in.`)

    return res.redirect("/user")
  }
);

authRoutes.post("/logout",
  userAuthenticated,
  (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err)
      return res.send("Logged out.")
    })
  }
)

export default authRoutes;