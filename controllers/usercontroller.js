const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) =>
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  }).then(
    (createSuccess = (user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({
        user: user,
        message: "user created",
        sessionToken: token,
      });
    }),
    (createError = (err) => res.status(500).json(err))
  )
);

router.post("/signin", (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (matches) {
          let token = jwt.sign({ id: user.id },
            process.env.JWT_SECRET, {expiresIn: '1d'})
            res.status(200).json({
                user: user,
                message: 'successfully authenticated user',
                sessionToken: token
            })
         } else {
             res.status(502).send({ error: 'Bad Gateway' })
         }
       })
     } else {
         res.status(500).send ({ error: 'failed to authenticate' })
     }
    },
    err => res.status(501).send({ error: 'failed to process'})
  )
})

module.exports = router;
