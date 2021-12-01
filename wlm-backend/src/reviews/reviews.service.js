const knex = require("../db/connection")

const readCritic = (critic_id) => {
  return knex("critics")
    .where({ critic_id })
    .first()
}

const setCritic = async (review) => {
  review.critic = await readCritic(review.critic_id)
  return review
}

const read = (review_id) => {
  return knex("reviews")
    .where({
      "review_id": review_id
    })
    .first()
}

const list = (movie_id) => {
  return knex("reviews")
  .where({ movie_id })
  .then((reviews) => Promise.all(reviews.map(setCritic)))
}

const update = (updatedReview) => {
    return knex("reviews")
      .insert(updatedReview)
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*")
      .then(() => read(updatedReview.review_id))
      .then(setCritic)
}

const destroy = (review_id) => {
  return knex("reviews")
    .where({ review_id: review_id })
    .del()
}

module.exports = {
  list,
  read,
  update,
  destroy
}