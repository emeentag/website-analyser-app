

export default class ErrorHandlerMiddleware {
  constructor(app) {
    this.app = app;
    this.applyMiddlewares();
  }

  // Apply appwise middlewares.
  applyMiddlewares() {
    this.app.use(this.logUsers);
    this.app.use(this.xhrErrorHandler);
    this.app.use(this.errorPageHandler);
  }

  // Just print the error and next.
  logUsers(err, req, res, next) {
    console.error(err.stack);
    next(err);
  }

  // If an xhr request ends with an error.
  xhrErrorHandler(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: err.stack });
    } else {
      next(err);
    }
  }

  // Render the error page if a page request fails.
  errorPageHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err.stack });
  }
}