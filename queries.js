const Pool = require("pg").Pool
const pool = new Pool({
  user: "ryannagel",
  host: "localhost",
  database: "bgvbackend",
  password: "postgres",
  port: 5432,
})

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

const getVault = (request, response) => {
  pool.query(
    "SELECT * FROM vault_games WHERE user_id = $1",
    [request.body.userID],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }
  )
}

// const getMechanicName = (request, response) => {
//   pool.query("SELECT json_object_agg(id, name) FROM mechanics", (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows[0]['json_object_agg'])
//   })
// }

const addToVault = async (request, response) => {
  try {
    await pool.query(
      `
  INSERT INTO vault_games (user_id, game_id, games) 
  VALUES ($1, $2, $3)`,
      [request.body.userID, request.body.game.id, request.body.game]
    )
    response.status(200).json({
      message: `${request.body.game.name} was successfully added to vault!`,
    })
  } catch (error) {
    if ((error.code = "23505")) {
      response.status(400).json({
        message: `${request.body.game.name} is already in your vault!`,
      })
    } else {
      response.status(500).json({
        message: "We ran into a problem. Please try again later.",
      })
    }
  }
}

const removeFromVault = async (request, response) => {
  try {
    await pool.query(
      `
    DELETE FROM vault_games WHERE user_id =$1 AND game_id = $2`,
      [request.body.userID, request.body.gameID]
    )
    response.status(200).json({
      message: `${request.body.game.name} successfully removed from vault.`,
    })
  } catch (error) {
    response.status(500).json({
      message: "We ran into a problem. Please try again later.",
    })
  }
}

module.exports = {
  getCategories,
  getMechanics,
  addToVault,
  getVault,
  removeFromVault,
}
