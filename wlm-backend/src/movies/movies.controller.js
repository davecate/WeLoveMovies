const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie_id = movieId
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

const list = async (req, res) => {
  const data = await service.list(req.query.is_showing)
  res.json({ data })
}

const read = (req, res) => {
  const data = res.locals.movie
  res.json({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list),],
  read: [asyncErrorBoundary(movieExists), read]
}