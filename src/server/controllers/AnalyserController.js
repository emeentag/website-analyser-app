import Request from 'request-promise';
import async from 'async';
import Cheerio from 'cheerio';

import ServerConfig from '../config/ServerConfig';
import WebpageAnalyser from '../utils/WebpageAnalyser';

export default class AnalyserController {

  static analyseWebPage(request, response, next) {
    var webpage = request.body.webpage;
    AnalyserController.getRawHTML(request, response, next, webpage);
  }

  /**
   * Make an async call for page body.
   * 
   * @param {*String} webpage 
   */
  static getRawHTML(request, response, next, webpage) {
    async.parallel([
      (nextCall) => {
        Request({
          uri: webpage,
          method: 'GET',
          timeout: ServerConfig.QUERY_TIMEOUT,
          resolveWithFullResponse: true
        })
          .then((res) => {
            nextCall(null, res);
          })
          .catch((err) => {
            nextCall(err, null);
          });
      }
    ], (err, results) => {
      if (err) {
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
  static analyzeBody(results, response) {
    var html = results[0].body;
    var websiteInfo = {};

    websiteInfo.version = WebpageAnalyser.getHTMLVersion(html);

    //console.log(results);
    response.status(200).send(websiteInfo);
  }
}