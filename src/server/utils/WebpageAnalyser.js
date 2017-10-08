import Request from 'request';
import async from 'async';
import urlParse from 'url-parse';

import ServerConfig from '../config/ServerConfig';

export default class WebPageAnalyser {

  /**
   * First find the index of the doctype.
   * Second look for html5, means doctype which is end with html.
   * If there is no like this doctype then get the version from html.
   * 
   * @param {* String} html 
   */
  static getHTMLVersion(html) {
    // Get DOCTYPE;
    var docTypeLowerCaseIndex = html.indexOf("<!doctype ");
    var docTypeUpperCaseIndex = html.indexOf("<!DOCTYPE ");
    let docTypeIndex;
    if (docTypeLowerCaseIndex >= docTypeUpperCaseIndex) {
      docTypeIndex = docTypeLowerCaseIndex;
    } else {
      docTypeIndex = docTypeUpperCaseIndex;
    }

    var isHTML5 = html.substring(docTypeIndex + 10, 15) == 'html>' ? true : false;

    if (isHTML5) {
      return "HTML 5";
    }

    return `HTML ${html.substring(docTypeIndex + 40, 44)}`;
  }

  /**
   * Get title from html.
   * 
   * @param {* String} html 
   * @param {* Cheerio} cheerio 
   */
  static getTitle(html, cheerio) {
    return cheerio('title').text();
  }

  /**
   * Get number of each headings from html.
   * 
   * @param {* String} html 
   * @param {* Cheerio} cheerio 
   * @param {* Headings} headings 
   */
  static getHeadings(html, cheerio, headings) {
    Object.keys(headings).forEach((heading, index) => {
      headings[heading] = cheerio(heading).length;
    })

    return headings;
  }

  /**
   * Check if there is an input under form element.
   * 
   * @param {* String} html 
   * @param {* Cheerio} cheerio 
   */
  static isLoginFormExist(html, cheerio) {
    return cheerio('form input[type="password"]').length > 0 ? true : false;
  }

  /**
   * This function finds all links inside provided html doc.
   * Then applies healty check for each link by making requests to that links. 
   * 
   * @param {* String} html 
   * @param {* Object of CheerioJS} cheerio 
   * @param {* JSON} responseModel 
   * @param {* Response of RequestJS} response 
   * @param {* Response} serverResponse 
   */
  static getLinks(html, cheerio, responseModel, response, serverResponse) {

    let urls = [];

    // Loop each element <a> and take the href value of them.
    cheerio('a').map((index, link) => {
      var href = cheerio(link).attr('href');
      if (href && href != '#') {
        if (href.startsWith('http://') || href.startsWith('https://')) {
          // External links.
          urls.push({
            "address":href, 
            "type": "ext"
          });
        } else if (href.startsWith('//')) {
          
          // Another external link.
          var parser = urlParse(serverResponse.req.body.webpage, false);

          urls.push({
            "address": parser.protocol.concat(href), 
            "type": "ext"
          });

        } else {
          // Internal links
          // Create the internal link with the domain name. We need it for making requests.

          var parser = urlParse(serverResponse.req.body.webpage, true);

          urls.push({
            "address": parser.origin.concat((href.startsWith('/') === true ? href : (href.concat('/')))), 
            "type": "int"
          });
        }
      }
    });
    
    WebPageAnalyser.checkAccessibility(responseModel, urls, serverResponse);
  }

  /**
   * This function makes async rest calls through the each domain.
   * In each async period, five functions are running in parallel.
   * After all aync functions are done, response sends to the client.
   * 
   * @param {* JSON} responseModel 
   * @param {* Array} urls 
   * @param {* Response} serverResponse 
   */
  static checkAccessibility(responseModel, urls, serverResponse) {
    async.eachLimit(urls, 5, (url, callback) => {
      Request({
        "url": url.address,
        "method": 'GET',
        "timeout": ServerConfig.QUERY_TIMEOUT
      }, (err, res, body) => {
        if (!err && res.statusCode == 200) {
          // Link is accessible so update the object as true.
          responseModel.links.push({...url, "accessible": true});
          console.log(`URL ${url.type}:${url.address} processed with 200OK.`);
          callback();
        } else {
          // Link isn't accessible so update the object as false.
          responseModel.links.push({...url, "accessible": false});
          console.log(`URL ${url.type}:${url.address} processed with another status.`);
          callback();
        }
      })
    }, (err) => {
      if(err) {
        serverResponse.status(500).send(err);        
      } else {
        // Return client response.
        serverResponse.status(200).send(responseModel);
      }
    });
  }
}