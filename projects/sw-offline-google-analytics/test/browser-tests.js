'use strict';

require('chai').should();

const seleniumAssistant = require('selenium-assistant');
const webdriver = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');
const express = require('express');

let globalDriver;

seleniumAssistant.printAvailableBrowserInfo();

function performTests(browserInfo) {
  describe(`Test in ${browserInfo.getPrettyName()}`, function() {
    it('should be able to use proxy', function() {
      this.timeout(0);
      const myProxy = proxy.manual({
        http: '127.0.0.1:8000',
        https: '127.0.0.1:8000'
      });
      const options = browserInfo.getSeleniumOptions();
      options.setProxy(myProxy);

      return browserInfo.getSeleniumDriver()
      .then(driver => {
        globalDriver = driver;

        return new Promise((resolve, reject) => {
          globalDriver.get('http://sw-helpers-proxy.com/proxy-test/')
          .then(() => {
            return globalDriver.executeScript(function() {
              return document.body.textContent;
            });
          })
          .then(pageContent => {
            pageContent.should.equal('OK');
          })
          .then(() => resolve())
          .thenCatch(reject);
        });
      });
    });
  });
}

describe('Perform in Browser Tests', function() {
  before(function() {
    return new Promise(resolve => {
      var expressApp = express();

      expressApp.all('*', function (req, res) {
        console.log(req.url);
        if (req.url === 'http://sw-helpers-proxy.com/proxy-test/') {
          return res.send('OK');
        }
        res.send('Hello World!');
      });

      expressApp.listen(8000, function () {
        resolve();
      });
    });
  });

  afterEach(function() {
    this.timeout(5000);

    return seleniumAssistant.killWebDriver(globalDriver)
    .then(() => {
      globalDriver = null;
    });
  });

  const browsers = seleniumAssistant.getAvailableBrowsers();
  browsers.forEach(browserInfo => {
    performTests(browserInfo);
  });
});
