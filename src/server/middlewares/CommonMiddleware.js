import BodyParser from 'body-parser';
import MethodOverride from 'method-override';

export default class CommonMiddleware {
  constructor(app) {
    this.app = app;
    this.applyMiddlewares();
  }

  // Apply appwise middlewares.
  applyMiddlewares() {
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.use(MethodOverride());
  }

  checkHttpProtocol(req, res, next) {
    if (!req.body.webpage.startsWith('http://') && !req.body.webpage.startsWith('https://')) {
      req.body.webpage = `http://${req.body.webpage}`;
    }

    next();
  }
}