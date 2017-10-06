export default class ServerConfig {

  static SERVER_PORT = (process.env.PORT || '3030');
  static SERVER_HOST = (process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0');
}