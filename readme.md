# Website Analyser Code Challenge for Scout24

This is an application for analysing the provided webpage according to criterias below:
* Show HTML version of the page.
* Show title of the page.
* Check if there is a login form in the page or not.
* Check for the headings and their counts in the page.
* Find all the links including internals and the externals with their accessibilitie. Show how many they are and list them in a table.

## Technology used:
* ES6
* Node.js
* Express.js
* React.js
* Redux.js
* Aysnc.js
* Cheerio.js
* React-Router.js
* Babel
* Mocha-Chai
* Webpack
* Bootstrap

## How to setup?

First of all clone or fork this repository. After you successfully clone it then you are ready to setup your environment.(If you have downloaded pack no need to clone.)

### Setup your production ready environment:
* Run `npm install` to install all node dependencies.
* Run `npm run build` in a terminal. This will create a public folder at the root with all production resources.
* Run `npm run server:production` for starting the server.
* **You are done.** You can go `http://localhost:3030` and check if everything is up and running.

### Setup your development environment:
* Run `npm install` to install all node dependencies.
* Run `npm run client:development` in a terminal. This will start the webpack-dev-server for making the development easy. Webpack-dev-server will proxy all requests to your backend server.
* Run `npm run server:development` for starting the your server backend.
* **You are done.** You can go `http://localhost:3000` and check if everything is up and running.

## How to test?
* Once you run one of your server developer or production with `npm run server:development`. You can now run the test.
* Run `npm run test` for running BDD tests.
* You will seee the results in that terminal session. Don't bother to run your test script again and again. If you get an error realted timeout please change the timeout from packeage.json. Sample test result is can be seen below:

```
    Website Analyser Test Suit
    Test without view input.
      ✓ should return 200OK (9996ms)
      ✓ should have links. (10368ms)
      ✓ should have version. (11456ms)
      ✓ should have title. (14238ms)
      ✓ should have headings. (12786ms)
      ✓ should have login form. (16846ms)


  6 passing (1m)
```

## How is cache analysis working?
When you open the UI, or when you make a POST rest call to the endpoint `/analyse` with a json body like below:
```
{
  "webpage": "https://www.immobilienscout24.de/"
}
```
AnalyserController.js controller handles the analysis jobs. We are checking version, title and so on. The challangive check is for the active links check. In here we are using `async.js` beauties like `eachLimit` function. This function processes parallel jobs with a job concurrent limit. In our app it is 5 jobs per processing. In here we are making rest calls through the links. After all calls are done we are parsing the response and return it back to the user.

## How is UI working?
It is a simple and clean UI which is builded with React.JS and and several libraries. Just type the url to the input and click the `Analyse` button. After some time you will see the results below the search bar. 

If you want to list your links and want to see each condition of each link, do not forget to click links title. It will expand a panel and shows the table.

## What could it be better?
Of course it could be better if we can make a deeper analysis with scanning several HTML markups. And also this link analyser part could be a seperate project and this web app and this link analyser could talk each other and make the thinks more scalable. We can prepare a docker container for the project for making the deployment much faster and better. 