const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const db = require("./queries")
const reg = require("./controllers/register")
const log = require("./controllers/login")
const port = process.env.PORT || 8000

require("./configs/dotenv")
const client = require("./configs/database")

client.connect((err) => {
  if (err) {
    console.log(err)
  }

  else {
    console.log("Data logging initiated!")
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const user = require("./routes/user")
app.use("/user", user)

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   optionsSuccessStatus: 200 
// }

app.get("/categories", db.getCategories)
app.get("/mechanics", db.getMechanics)

app.post("/register", reg.register)
app.post("/login", log.login)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
