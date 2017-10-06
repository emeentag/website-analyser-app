export default class WebpageAnalyser {

  static getHTMLVersion(html) {
    // Get DOCTYPE;
    var docTypeLowerCaseIndex = html.indexOf("<!doctype ");
    var docTypeUpperCaseIndex = html.indexOf("<!DOCTYPE ");
    let docTypeIndex;
    if(docTypeLowerCaseIndex >= docTypeUpperCaseIndex) {
      docTypeIndex = docTypeLowerCaseIndex;
    } else {
      docTypeIndex = docTypeUpperCaseIndex;
    }

    var isHTML5 = html.substring(docTypeIndex + 10, 15) == 'html>' ? true : false;

    if(isHTML5) {
      return "HTML 5";
    }
    
    return `HTML ${html.substring(docTypeIndex + 40, 44)}`;
  }
}