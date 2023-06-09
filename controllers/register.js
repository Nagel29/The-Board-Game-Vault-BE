const bcrypt = require("bcrypt")

const client = require("../configs/database")

const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const data = await client.query(`SELECT * FROM users WHERE username=$1`, [
      username,
    ])
    const arr = data.rows
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Username already exists.",
      })
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          })
        const user = {
          username,
          password: hash,
        }
        var flag = 1 //Declaring a flag

        //Inserting data into the database
        client.query(
          `INSERT INTO users (username, password) VALUES ($1,$2);`,
          [user.username, user.password],
          (err) => {
            if (err) {
              flag = 0 //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.error(err)
              return res.status(500).json({
                error: "Database error",
              })
            } else {
              flag = 1
              res
                .status(200)
                .send({ message: "User added to database, not verified" })
            }
          }
        )
        if (flag) {
          const token = jwt.sign(
            //Signing a jwt token
            {
              username: user.username,
            },
            process.env.SECRET_KEY
          )
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: "Database error while registering user!", //Database connection error
    })
  }
}
