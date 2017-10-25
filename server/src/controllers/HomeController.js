export default class HomeController {

  static getHome(req, res, next) {
    res.status(200).render('index', {
      title: "Welcome to Website Alayser"
    });
  }
}