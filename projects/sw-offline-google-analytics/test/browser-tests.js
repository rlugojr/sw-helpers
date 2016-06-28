const seleniumAssistant = require('selenium-assistant');
const webdriver = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');
const express = require('express');



const browsers = seleniumAssistant.getAvailableBrowsers();
browsers.forEach(browserInfo => {
  if (browserInfo.getSeleniumBrowserId() !== 'chrome') {
    return;
  }

  console.log(browserInfo.getRawVersionString());
});






describe('Do Test', function() {
  let globalDriver;

  before(function() {
    return new Promise(resolve => {
      var expressApp = express();

      expressApp.all('*', function (req, res) {
        console.log('HERE <-----------------------');
        res.send('Hello World!');
      });

      expressApp.listen(8000, function () {
        console.log('Example app listening on port 8000!');
        resolve();
      });
    });
  })

  it('should do something', function() {
    this.timeout(0);
    const builder = browsers[0].getSeleniumDriverBuilder();
    const myProxy = proxy.manual({
      http: '127.0.0.1:8080',
      https: '127.0.0.1:8080'
    });

    const options = browsers[0].getSeleniumOptions();
    options.addArguments('proxy=127.0.0.1:8080');

    const chromeCapabilities = webdriver.Capabilities.chrome();
    chromeCapabilities.set(webdriver.Capability.PROXY, myProxy);

    return new Promise(resolve => {
      globalDriver = builder.withCapabilities(chromeCapabilities)
      .setProxy(myProxy)
      .build();

      globalDriver.get('http://example.com');
    })
    .then(() => {
      return new Promise(resolve => {
        setTimeout(resolve, 60000);
      });
    })
    .then(() => {
      seleniumAssistant.killWebDriver(globalDriver);
    });
  });
});
