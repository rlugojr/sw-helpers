importScripts(
  '/node_modules/mocha/mocha.js',
  '/node_modules/chai/chai.js',
  '/node_modules/sw-testing-helpers/build/browser/mocha-utils.js',
  '/packages/sw-broadcast-cache-update/build/sw-broadcast-cache-update.min.js'
);

const expect = self.chai.expect;
mocha.setup({
  ui: 'bdd',
  reporter: null,
});

const exportedSymbols = [
  'Plugin',
  'broadcastUpdate',
  'cacheUpdatedMessageType',
  'responsesAreSame',
];

describe('Test Library Surface', function() {
  it('should be accessible via goog.broadcastCacheUpdate', function() {
    expect(goog.broadcastCacheUpdate).to.exist;
  });

  exportedSymbols.forEach((exportedSymbol) => {
    it(`should expose ${exportedSymbol} via goog.broadcastCacheUpdate`, function() {
      expect(goog.broadcastCacheUpdate[exportedSymbol]).to.exist;
    });
  });
});
