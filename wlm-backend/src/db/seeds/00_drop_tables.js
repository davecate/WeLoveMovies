module.exports.seed = function (knex) {
  // deletes ALL existing entries
  return knex("reviews")
    .truncate()
    .then(() => knex("movies_theaters").truncate())
    .then(() => knex("critics").del())
    .then(() => knex("movies").del())
    .then(() => knex("theaters").del());
};
