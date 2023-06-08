const bcrypt = require("bcrypt")

const client = require("../configs/database")

const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const data = await client.query(`SELECT * FROM users WHERE username= $1;`, [
      username,
    ])
    const user = data.rows
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, please click the link below.",
      })
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Server error",
          })
        } else if (result === true) {
          const token = jwt.sign(
            {
              username: username,
            },
            process.env.SECRET_KEY
          )
          res.status(200).json({
            message: "User signed in!",
            token: token,
          })
        } else {
          if (result != true) {
            res.status(400).json({
              error: "Incorrect password, please try again.",
            })
          }
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: "Database error occured while signing in!",
    })
  }
}
