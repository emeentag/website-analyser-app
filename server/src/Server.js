import Express from "express";

import CommonMiddleware from './middlewares/CommonMiddleware';
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
import Routes from './routes/Routes';
import ServerConfig from './config/ServerConfig';

export default class Server {
  constructor() {
    this.app = new Express();

    const commonMiddleware = new CommonMiddleware(this.app);

    const errorHandlerMiddleware = new ErrorHandlerMiddleware(this.app);

    const routes =  new Routes(Express, this.app, commonMiddleware);

    this.initiateServer(this.app);
  }

  initiateServer(app) {
    var server = app.listen(ServerConfig.SERVER_PORT, ServerConfig.SERVER_HOST, () => {
      var host = server.address().address;
      var port = server.address().port;

      console.log(`Server ENV is ${process.env.NODE_ENV}`);
      console.log(`Server is listening at http://${host}:${port}`);
    });
  }
}

var server = new Server();