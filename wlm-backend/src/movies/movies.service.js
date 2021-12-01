const knex = require("../db/connection")


const list = (is_showing) => {
  return knex("movies as m")
    .select("m.*")
    .modify((query) => {
      if (is_showing) {
        query
          .join(
            "movies_theaters as mt",
            "m.movie_id", "mt.movie_id"
          )
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id")
      }
    })
}

const read = (movie_id) => {
  return knex("movies")
    .select("*")
    .where({ "movie_id": movie_id })
    .first()
}

module.exports = {
  list,
  read,
}