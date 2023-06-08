const Pool = require("pg").Pool
const pool = new Pool({
  user: 'ryannagel',
  host: 'localhost',
  database: 'bgvbackend',
  password: 'postgres',
  port: 5432
});

const getCategories = (request, response) => {
  pool.query("SELECT * FROM categories ORDER BY name ASC", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const getCategoryName = (request, response) => {
//   pool.query("SELECT json_object_agg(id, name) FROM categories", (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows[0]['json_object_agg'])
//   })
// }

const getMechanics = (request, response) => {
  pool.query("SELECT * FROM mechanics ORDER BY name ASC", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const getMechanicName = (request, response) => {
//   pool.query("SELECT json_object_agg(id, name) FROM mechanics", (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows[0]['json_object_agg'])
//   })
// }

const addToVault = (request, response) => {
  pool.query(`INSERT INTO vault_games (userID, gameID) VALUES (${request.userID, request.gameID}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200)
  })
}

module.exports = {
  getCategories,
  getMechanics,
  addToVault,
}