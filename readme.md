# Building a simple Web-Application for Analyzing Web-Sites
The objective is to build a web-application that does some analysis of a web-page/URL.

The application should show a form with a text-field thus the user can type in the URL of the webpage being analyzed. Additionally to form should contain a button for sending the input to the server as well as to trigger the server-side analysis process.

After processing the results should be shown to the user in terms of a simple table below to the form. The result comprises the following information:

* What HTML version has the document?
* What is the page title?
* How many headings of what level are in the document?
* How many internal and external links are in the document? Are there any inaccessible links and how many?
* Did the page contain a login-form?

In case the URL given by the user is not reachable an error message should appear below the input form. The message should contain the HTTP status-code and some useful error description.

Please write a node application handling all the wanted features. HINT: for document analysis consider using a library such as cheerio.js and for the server framework you could use express.js! If you are more familiar with other frameworks/libraries please feel free to use them.

For the frontend part you can use all the available libraries and frameworks available on the internet.

As a hint: CSS and Javascript for the frontend can be optimized automatically (Grunt.js) 

Please provide the result as a npm package with this content:

1. The project with all source files
2. A short text document that lists the main steps of building your solution as well as all assumptions/decisions you made in case of unclear requirements or missing information 
Thank you for your cooperation!