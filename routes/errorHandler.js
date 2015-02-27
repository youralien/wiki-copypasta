module.exports = function errorHandler(err, req, res, next) {
  res.status(500);
  console.log(err);
  res.end();
  // res.render('error', { error: err });
}