const { Client } = require("pg")
const DB_URL = require("./dotenv.js")

const client = new Client(process.env.DB_URL) //Configuring PostgresSQL Database

module.exports = client
