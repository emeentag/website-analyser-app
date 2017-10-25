import Path from 'path';

import HomeController from '../controllers/HomeController';
import AnalyserController from '../controllers/AnalyserController';

export default class Routes {

  constructor(express, app, commonMiddleware) {
    this.express = express;
    this.app = app;
    this.commonMiddleware = commonMiddleware;
    this.loadTemplateResources();
    this.loadStaticResources();
    this.createURLRoutes();
  }

  // Templates rendering.
  loadTemplateResources() {
    this.app.set('view engine', 'ejs')
    this.app.set('views', Path.resolve(__dirname, '../', 'resources', 'templates'))
  }

  // Static html, img and other files.
  loadStaticResources() {
    this.app.use(this.express.static(Path.resolve(__dirname, '../', 'resources', 'static')));
  }

  createURLRoutes() {
    // ::::GETs::::
    // Home
    this.app.get('/', HomeController.getHome);
    
    // ::::POSTs::::
    this.app.post('/analyse', this.commonMiddleware.checkHttpProtocol, AnalyserController.analyseWebPage);
    // ::::PUTs::::
    // ::::DELETEs::::
  }
}