// Pages
import Home from '../pages/Home';

export default class AppConfig {
  static ROUTES = [
    {
      path: '/',
      exact: true,
      name: 'Home',
      isMenuRoute: true,
      component: Home
    },
  ]
}