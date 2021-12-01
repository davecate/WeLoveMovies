const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

const reviewExists = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review_id = reviewId
    res.locals.review = review
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

const list = async (req, res) => {
  const data = await service.list(req.params.movieId)
  res.json({ data })
}

const update = async (req, res, next) => {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review_id
  }
  const data = await service.update(updatedReview)
  res.status(201).json({ data })
}

const destroy = async (req, res, next) => {
  await service.destroy(res.locals.review_id)
  res.sendStatus(204)
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExists), update],
  delete: [asyncErrorBoundary(reviewExists), destroy],
}