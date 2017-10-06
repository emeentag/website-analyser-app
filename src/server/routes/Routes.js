import Path from 'path';
import HBS from 'express-handlebars';

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
    this.app.engine('hbs', HBS({
      extname: 'hbs',
      defaultLayout: 'layout',
      layoutsDir: Path.resolve(__dirname, '../../', 'client', 'templates', 'layouts')
    }));
    this.app.set('views', Path.resolve(__dirname, '../../', 'client', 'templates'));
    this.app.set('view engine', 'hbs');
  }

  // Static html, img and other files.
  loadStaticResources() {
    this.app.use(this.express.static(Path.resolve(__dirname, '../../', 'client', 'statics')));
  }

  createURLRoutes() {
    // ::::GETs::::
    // Home
    this.app.get('/', HomeController.getHome);
    
    // ::::POSTs::::
    this.app.post('/analyse', AnalyserController.analyseWebPage);
    // ::::PUTs::::
    // ::::DELETEs::::
  }
}