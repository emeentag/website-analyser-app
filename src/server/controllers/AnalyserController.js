import Request from 'request';
import async from 'async';
import Cheerio from 'cheerio';

import ServerConfig from '../config/ServerConfig';
import WebPageAnalyser from '../utils/WebPageAnalyser';
import WebPageInfo from '../models/WebPageInfo.json';

export default class AnalyserController {

  static analyseWebPage(request, response, next) {
    var webpage = request.body.webpage;
    AnalyserController.getRawHTML(request, response, next, webpage);
  }

  /**
   * Make an async call for page body.
   * 
   * @param {* String} webpage 
   */
  static getRawHTML(request, response, next, webpage) {
    async.parallel([
      (nextCall) => {
        Request({
          uri: webpage,
          method: 'GET',
          timeout: ServerConfig.QUERY_TIMEOUT,
          resolveWithFullResponse: true
        }, (err, res, body) => {
          if (!err && res.statusCode == 200) {
            nextCall(null, res);
          } else {
            nextCall(err, null);
          }
        });
      }
    ], (err, results) => {
      if (err || !results[0]) {
        console.error("There is an error occured!");
        console.error(err);
        response.status(500).send(err);
      } else {
        AnalyserController.analyzeBody(results, response);
      }
    });
  }

  /**
   * Analyze body inside raw html.
   * 
   * @param {*Array} results 
   */
  static analyzeBody(results, serverResponse) {
    var response = results[0];
    var html = response.body;
    var cheerio = Cheerio.load(html);

    WebPageInfo.version = WebPageAnalyser.getHTMLVersion(html);
    WebPageInfo.title = WebPageAnalyser.getTitle(html, cheerio);
    WebPageInfo.headings = WebPageAnalyser.getHeadings(html, cheerio, WebPageInfo.headings);
    WebPageInfo.loginForm = WebPageAnalyser.isLoginFormExist(html, cheerio);

    // Check for the accessible links and return server response.
    // This function contains async functions so this is the reason why we are
    // passing server response as a parameter here. We should response all async functions are done.
    WebPageAnalyser.getLinks(html, cheerio, WebPageInfo, response, serverResponse);
  }
}