/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.goog = global.goog || {}, global.goog.swlib = factory());
}(this, (function () { 'use strict';

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * A simple class to make errors and to help with testing.
 */

class ErrorFactory$1 {
  /**
   * @param {Object} errors A object containing key value pairs where the key
   * is the error name / ID and the value is the error message.
   */
  constructor(errors) {
    this._errors = errors;
  }
  /**
   * @param {string} name The error name to be generated.
   * @param {Error} [thrownError] The thrown error that resulted in this
   * message.
   * @return {Error} The generated error.
   */
  createError(name, thrownError) {
    if (!(name in this._errors)) {
      throw new Error(`Unable to generate error '${ name }'.`);
    }

    let message = this._errors[name];
    let stack = null;
    if (thrownError) {
      message += ` [${ thrownError.message }]`;
      stack = thrownError.stack;
    }

    const generatedError = new Error();
    generatedError.name = name;
    generatedError.message = message;
    generatedError.stack = stack;
    return generatedError;
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const errors = {
  'not-in-sw': 'sw-lib must be loaded in your service worker file.',
  'unsupported-route-type': 'Routes must be either a express style route ' + 'string, a Regex to capture request URLs or a Route instance.',
  'empty-express-string': 'The Express style route string must have some ' + 'characters, an empty string is invalid.',
  'bad-revisioned-cache-list': `The 'cacheRevisionedAssets()' method expects` + `an array of revisioned urls like so: ['/example/hello.1234.txt', ` + `{path: 'hello.txt', revision: '1234'}]`
};

var ErrorFactory = new ErrorFactory$1(errors);

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

function atLeastOne(object) {
  const parameters = Object.keys(object);
  if (!parameters.some(parameter => object[parameter] !== undefined)) {
    throw Error('Please set at least one of the following parameters: ' + parameters.map(p => `'${ p }'`).join(', '));
  }
}

function hasMethod(object, expectedMethod) {
  const parameter = Object.keys(object).pop();
  const type = typeof object[parameter][expectedMethod];
  if (type !== 'function') {
    throw Error(`The '${ parameter }' parameter must be an object that exposes ` + `a '${ expectedMethod }' method.`);
  }
}

function isInstance(object, expectedClass) {
  const parameter = Object.keys(object).pop();
  if (!(object[parameter] instanceof expectedClass)) {
    throw Error(`The '${ parameter }' parameter must be an instance of ` + `'${ expectedClass.name }'`);
  }
}

function isOneOf(object, values) {
  const parameter = Object.keys(object).pop();
  if (!values.includes(object[parameter])) {
    throw Error(`The '${ parameter }' parameter must be set to one of the ` + `following: ${ values }`);
  }
}

function isType(object, expectedType) {
  const parameter = Object.keys(object).pop();
  const actualType = typeof object[parameter];
  if (actualType !== expectedType) {
    throw Error(`The '${ parameter }' parameter has the wrong type. ` + `(Expected: ${ expectedType }, actual: ${ actualType })`);
  }
}

function isSWEnv() {
  return 'ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope;
}

function isValue(object, expectedValue) {
  const parameter = Object.keys(object).pop();
  const actualValue = object[parameter];
  if (actualValue !== expectedValue) {
    throw Error(`The '${ parameter }' parameter has the wrong value. ` + `(Expected: ${ expectedValue }, actual: ${ actualValue })`);
  }
}

var assert = {
  atLeastOne,
  hasMethod,
  isInstance,
  isOneOf,
  isType,
  isSWEnv,
  isValue
};

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const defaultMethod = 'GET';
const validMethods = ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'];

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-routing
 */
class Route {
  /**
   * The constructor for Route expects an object with `match` and `handler`
   * properties which should both be functions.
   *
   * @param {function} match - The function that determines whether the
   *        route matches.
   * @param {Object} handler - An Object with a `handle` method. That method
   *        will be used to respond to matching requests.
   * @param {string} [method] Only match requests that use this
   *        HTTP method. Defaults to `'GET'` if not specified.
   */
  constructor({ match, handler, method } = {}) {
    assert.isType({ match }, 'function');
    assert.hasMethod({ handler }, 'handle');

    this.match = match;
    this.handler = handler;
    if (method) {
      assert.isOneOf({ method }, validMethods);
      this.method = method;
    } else {
      this.method = defaultMethod;
    }
  }
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * ExpressRoute is a helper class to make defining Express-style
 * [Routes]{@link Route} easy.
 *
 * Under the hood, it uses the [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)
 * library to transform the `path` parameter into a regular expression, which is
 * then matched against the URL's path.
 *
 * @memberof module:sw-routing
 * @extends Route
 */
class ExpressRoute extends Route {
  /**
   * @param {string} path The path to use for routing.
   *        If the path contains [named parameters](https://github.com/pillarjs/path-to-regexp#named-parameters),
   *        then an Object mapping parameter names to the corresponding value
   *        will be passed to the handler via `params`.
   * @param {function} handler The handler to manage the response.
   * @param {string} [method] Only match requests that use this
   *        HTTP method. Defaults to `'GET'` if not specified.
   */
  constructor({ path, handler, method }) {
    assert.isType({ path }, 'string');

    let keys = [];
    // keys is populated as a side effect of pathToRegExp. This isn't the nicest
    // API, but so it goes.
    // https://github.com/pillarjs/path-to-regexp#usage
    const regExp = index(path, keys);
    const match = ({ url }) => {
      const regexpMatches = url.pathname.match(regExp);

      // Return null immediately if this route doesn't match.
      if (!regexpMatches) {
        return null;
      }

      // If the route does match, then collect values for all the named
      // parameters that were returned in keys.
      // If there are no named parameters then this will end up returning {},
      // which is truthy, and therefore a sufficient return value.
      const namedParamsToValues = {};
      keys.forEach((key, index$$1) => {
        namedParamsToValues[key.name] = regexpMatches[index$$1 + 1];
      });

      return namedParamsToValues;
    };

    super({ match, handler, method });
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * RegExpRoute is a helper class to make defining Regular Expression based
 * [Routes]{@link Route} easy.
 *
 * @memberof module:sw-routing
 * @extends Route
 */
class RegExpRoute extends Route {
  /**
   * @param {RegExp} regExp The regular expression to match against URLs.
   *        If the `RegExp` contains [capture groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references),
   *        then the array of captured values will be passed to the handler via
   *        `params`.
   * @param {function} handler The handler to manage the response.
   * @param {string} [method] Only match requests that use this
   *        HTTP method. Defaults to `'GET'` if not specified.
   */
  constructor({ regExp, handler, method }) {
    assert.isInstance({ regExp }, RegExp);

    const match = ({ url }) => {
      const regexpMatches = url.href.match(regExp);
      // Return null immediately if this route doesn't match.
      if (!regexpMatches) {
        return null;
      }

      // If the route matches, but there aren't any capture groups defined, then
      // this will return [], which is truthy and therefore sufficient to
      // indicate a match.
      // If there are capture groups, then it will return their values.
      return regexpMatches.slice(1);
    };

    super({ match, handler, method });
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The Router takes a set of {@link Route}'s and will direct fetch events
 * to those Route in the order they are registered.
 *
 * @memberof module:sw-routing
 */
class Router {
  /**
   * A default handler will have it's handle method called when a
   * request doesn't have a matching route.
   * @param {Object} input
   * @param {Handler} input.handler A handler to deal with default routes.
   */
  setDefaultHandler({ handler } = {}) {
    assert.hasMethod({ handler }, 'handle');

    this.defaultHandler = handler;
  }

  /**
   * If a Route throws an error while handling a request, this catch handler
   * will be called to return an error case.
   * @param {Object} input
   * @param {Handler} input.handler A handler to deal with errors in routes.
   */
  setCatchHandler({ handler } = {}) {
    assert.hasMethod({ handler }, 'handle');

    this.catchHandler = handler;
  }

  /**
   * Register routes will take an array of Routes to register with the
   * router.
   *
   * @param {Object} options
   * @param {Array<Route>} options.routes
   * @return {void}
   */
  registerRoutes({ routes } = {}) {
    assert.isInstance({ routes }, Array);

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);
      if (!url.protocol.startsWith('http')) {
        return;
      }

      let responsePromise;
      for (let route of routes || []) {
        if (route.method !== event.request.method) {
          continue;
        }

        const matchResult = route.match({ url, event });
        if (matchResult) {
          let params = matchResult;

          if (Array.isArray(params) && params.length === 0) {
            // Instead of passing an empty array in as params, use undefined.
            params = undefined;
          } else if (params.constructor === Object && Object.keys(params).length === 0) {
            // Instead of passing an empty object in as params, use undefined.
            params = undefined;
          }

          responsePromise = route.handler.handle({ url, event, params });
          break;
        }
      }

      if (!responsePromise && this.defaultHandler) {
        responsePromise = this.defaultHandler.handle({ url, event });
      }

      if (responsePromise && this.catchHandler) {
        responsePromise = responsePromise.catch(error => {
          return this.catchHandler.handle({ url, event, error });
        });
      }

      if (responsePromise) {
        event.respondWith(responsePromise);
      }
    });
  }

  /**
   * Registers a route with the router.
   * @param {Object} input
   * @param {Route} input.route The route to register.
   */
  registerRoute({ route } = {}) {
    assert.isInstance({ route }, Route);

    this.registerRoutes({ routes: [route] });
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * sw-routing Module
 * @module sw-routing
 */

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env browser, serviceworker */

/**
 * A simple class that pulls together a few different pieces from the
 * Router Module to surface them in a friendly API.
 *
 * @example <caption>How to define a simple route with caching
 * strategy.</caption>
 *
 * self.goog.swlib.router.registerRoute('/about', ....);
 *
 * @example <caption>How to define a simple route with custom caching
 * strategy.</caption>
 *
 * self.goog.swlib.router.registerRoute('/about', (args) => {
 *   // The requested URL
 *   console.log(args.url);
 *
 *   // The FetchEvent to handle
 *   console.log(args.event);
 *
 *   // The parameters from the matching route.
 *   console.log(args.params);
 *
 *   // Return a promise that resolves with a Response.
 *   return fetch(args.url);
 * }));
 *
 * @example <caption>How to define a route using a Route instance.</caption>
 *
 * const routeInstance = new goog.swlib.Route({
 *   match: (url) => {
 *     // Return true or false
 *     return true;
 *   },
 *   handler: {
 *     handle: (args) => {
 *       // The requested URL
 *       console.log(args.url);
 *
 *       // The FetchEvent to handle
 *       console.log(args.event);
 *
 *       // The parameters from the matching route.
 *       console.log(args.params);
 *
 *       // Return a promise that resolves with a Response.
 *       return fetch(args.url);
 *     },
 *   },
 * });
 * self.goog.swlib.router.registerRoute(routeInstance);
 *
 * @memberof module:sw-lib
 */
class RouterWrapper {
  /**
   * Constructs a new RouterWrapper.
   */
  constructor() {
    this._router = new Router();
  }

  /**
   * @param {String|Regex|Route} capture The capture for a route can be one
   * of three types.
   * 1. It can be an Express style route, like: '/example/:anything/route/'
   *    The only gotcha with this is that it will only capture URL's on your
   *    origin.
   * 1. A regex that will be tested against request URL's.
   * 1. A [Route]{@link module:sw-routing.Route} instance.
   * @param {function|Handler} handler The handler is ignored if you pass in
   * a Route object, otherwise it's required. The handler will be called when
   * the route is caught by the capture criteria.
   */
  registerRoute(capture, handler) {
    if (typeof handler === 'function') {
      handler = {
        handle: handler
      };
    }

    if (typeof capture === 'string') {
      if (capture.length === 0) {
        throw ErrorFactory.createError('empty-express-string');
      }

      this._router.registerRoute({
        route: new ExpressRoute({ path: capture, handler })
      });
    } else if (capture instanceof RegExp) {
      this._router.registerRoute({
        route: new RegExpRoute({ regExp: capture, handler })
      });
    } else if (capture instanceof Route) {
      this._router.registerRoute({ route: capture });
    } else {
      throw ErrorFactory.createError('unsupported-route-type');
    }
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const errors$1 = {
  'not-in-sw': 'sw-precaching must be loaded in your service worker file.',
  'invalid-revisioned-entry': `File manifest entries must be either a ` + `string with revision info in the url or an object with a 'url' and ` + `'revision' parameters.`,
  'invalid-unrevisioned-entry': ``,
  'bad-cache-bust': `The cache bust parameter must be a boolean.`,
  'duplicate-entry-diff-revisions': `An attempt was made to cache the same ` + `url twice with each having different revisions. This is not supported.`,
  'request-not-cached': `A request failed the criteria to be cached. By ` + `default, only responses with 'response.ok = true' are cached.`,
  'should-override': 'Method should be overridden by the extending class.'
};

var ErrorFactory$3 = new ErrorFactory$1(errors$1);

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/**
 * This class handles the shared logic for caching revisioned and unrevisioned
 * assets.
 * @private
 * @memberof module:sw-precaching
 */
class BaseCacheManager {
  /**
   * Constructor for BaseCacheManager
   * @param {String} cacheName This is the cache name to store requested assets.
   */
  constructor(cacheName) {
    this._entriesToCache = new Map();
    this._cacheName = cacheName;
  }

  /**
   * This method will add the entries to the install list.
   * This will manage duplicate entries and perform the caching during
   * the install step.
   * @param {Array<String|Request|Object>} rawEntries A raw entry that can be
   * parsed into a BaseCacheEntry by the inheriting CacheManager.
   */
  cache(rawEntries) {
    rawEntries.forEach(rawEntry => {
      this._addEntryToInstallList(this._parseEntry(rawEntry));
    });
  }

  /**
   * This method will add an entry to the install list.
   *
   * This method will filter out duplicates and also checks for the scenario
   * where two entries have the same URL but different revisions. For example
   * caching:
   * [
   *   {url: '/hello.txt', revision: '1'},
   *   {url: '/hello.txt', revision: '2'},
   * ]
   * Will throw an error as the library can't determine the correct revision
   * and this may cause issues in future when updating the service worker
   * with new revisions.
   *
   * @private
   * @param {RevisionedCacheEntry} precacheEntry The file entry to be cached
   * during the next install event.
   */
  _addEntryToInstallList(precacheEntry) {
    const entryID = precacheEntry.entryID;
    const previousEntry = this._entriesToCache.get(precacheEntry.entryID);
    if (!previousEntry) {
      // This entry isn't in the install list
      this._entriesToCache.set(entryID, precacheEntry);
      return;
    }

    this._onDuplicateInstallEntryFound(precacheEntry, previousEntry);
  }

  /**
   * This method manages the actual install event to cache the revisioned
   * assets.
   *
   * @private
   * @return {Promise} The promise resolves when all the desired assets are
   * cached.
   */
  _performInstallStep() {
    var _this = this;

    return asyncToGenerator(function* () {
      if (_this._entriesToCache.size === 0) {
        return;
      }

      const cachePromises = [];
      _this._entriesToCache.forEach(function (precacheEntry) {
        cachePromises.push(_this._cacheEntry(precacheEntry));
      });

      // Wait for all requests to be cached.
      return Promise.all(cachePromises);
    })();
  }

  /**
   * This method will request the entry and save it to the cache if the response
   * is valid.
   *
   * @private
   * @param {BaseCacheEntry} precacheEntry The entry to fetch and cache.
   * @return {Promise} Returns a promise that resolves once the entry is fetched
   * and cached.
   */
  _cacheEntry(precacheEntry) {
    var _this2 = this;

    return asyncToGenerator(function* () {
      const isCached = yield _this2._isAlreadyCached(precacheEntry);
      if (isCached) {
        return;
      }

      let response = yield fetch(precacheEntry.getNetworkRequest(), {
        credentials: 'same-origin',
        redirect: 'follow'
      });
      if (response.ok) {
        const openCache = yield _this2._getCache();
        yield openCache.put(precacheEntry.request, response);

        return _this2._onEntryCached(precacheEntry);
      } else {
        throw ErrorFactory$3.createError('request-not-cached', {
          message: `Failed to get a cacheable response for ` + `'${ precacheEntry.request.url }'`
        });
      }
    })();
  }

  /**
   * This method will compare the URL's
   * and figure out which assets are no longer required to be cached.
   *
   * This should be called in the activate event.
   *
   * @private
   * @return {Promise} Promise that resolves once the cache entries have been
   * cleaned.
   */
  _cleanUpOldEntries() {
    var _this3 = this;

    return asyncToGenerator(function* () {
      if (!(yield caches.has(_this3._cacheName))) {
        // Cache doesn't exist, so nothing to delete
        return;
      }

      const requestsCachedOnInstall = [];
      _this3._entriesToCache.forEach(function (entry) {
        requestsCachedOnInstall.push(entry.request.url);
      });

      const openCache = yield _this3._getCache();
      const allCachedRequests = yield openCache.keys();

      const cachedRequestsToDelete = allCachedRequests.filter(function (cachedRequest) {
        if (requestsCachedOnInstall.includes(cachedRequest.url)) {
          return false;
        }
        return true;
      });

      return Promise.all(cachedRequestsToDelete.map(function (cachedRequest) {
        return openCache.delete(cachedRequest);
      }));
    })();
  }

  /**
   * A simple helper method to get the cache used for precaching assets.
   *
   * @private
   * @return {Promise<Cache>} The cache to be used for precaching.
   */
  _getCache() {
    var _this4 = this;

    return asyncToGenerator(function* () {
      if (!_this4._cache) {
        _this4._cache = yield caches.open(_this4._cacheName);
      }

      return _this4._cache;
    })();
  }

  /**
   * This method ensures that the file entry in the maniest is valid and
   * can be parsed as a BaseCacheEntry.
   *
   * @private
   * @abstract
   * @param {String | Request | Object} input Either a URL string, a Request
   * or an object with a `url`, `revision` and optional `cacheBust` parameter.
   * @return {BaseCacheEntry} Returns a parsed version of the file entry.
   */
  _parseEntry(input) {
    throw ErrorFactory$3.createError('should-override');
  }

  /**
   * This method is called if the consumer of this cache manager has to
   * cache entries that are to be installed but have the same "entryID".
   * This means that the user is trying to cache the same thing twice.
   * This callback gives extending classed a chance to throw an error
   * if there is an edge case that can't be handled.
   *
   * @private
   * @abstract
   * @param {BaseCacheEntry} newEntry The entry that is to be cached.
   * @param {BaseCacheEntry} previous The entry that is currently cached.
   */
  _onDuplicateEntryFound(newEntry, previous) {
    throw ErrorFactory$3.createError('should-override');
  }

  /**
   * This method confirms with a fileEntry is already in the cache with the
   * appropriate revision.
   * If the revision is known, matching the requested `fileEntry.revision` and
   * the cache entry exists for the `fileEntry.path` this method returns true.
   * False otherwise.
   *
   * @private
   * @abstract
   * @param {BaseCacheEntry} precacheEntry A file entry with `path` and
   * `revision` parameters.
   * @return {Promise<Boolean>} Returns true is the fileEntry is already
   * cached, false otherwise.
   */
  _isAlreadyCached(precacheEntry) {
    throw ErrorFactory$3.createError('should-override');
  }

  /**
   * This method can be used for any work that needs to be done when a
   * URL has been cached.
   *
   * @private
   * @abstract
   * @param {BaseCacheEntry} precacheEntry A file entry with `path` and
   * `revision` parameters.
   * @return {Promise} Returns a Promise that resolves once it's work has
   * been done.
   */
  _onEntryCached(precacheEntry) {
    throw ErrorFactory$3.createError('should-override');
  }
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var idb = createCommonjsModule(function (module) {
'use strict';

(function() {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      request.onupgradeneeded = function(event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  {
    module.exports = exp;
  }
}());
});

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * A wrapper to store for an IDB connection to a particular ObjectStore.
 *
 * @private
 */
class IDBHelper {
  constructor(name, version, storeName) {
    if (name == undefined || version == undefined || storeName == undefined) {
      throw Error('name, version, storeName must be passed to the ' + 'constructor.');
    }

    this._name = name;
    this._version = version;
    this._storeName = storeName;
  }

  /**
   * Returns a promise that resolves with an open connection to IndexedDB,
   * either existing or newly opened.
   *
   * @private
   * @return {Promise<DB>}
   */
  _getDb() {
    if (this._dbPromise) {
      return this._dbPromise;
    }

    this._dbPromise = idb.open(this._name, this._version, upgradeDB => {
      upgradeDB.createObjectStore(this._storeName);
    }).then(db => {
      return db;
    });

    return this._dbPromise;
  }

  close() {
    if (!this._dbPromise) {
      return;
    }

    return this._dbPromise.then(db => {
      db.close();
      this._dbPromise = null;
    });
  }

  /**
   * Wrapper on top of the idb wrapper, which simplifies saving the key/value
   * pair to the object store.
   * Returns a Promise that fulfills when the transaction completes.
   *
   * @private
   * @param {String} key
   * @param {Object} value
   * @return {Promise<T>}
   */
  put(key, value) {
    return this._getDb().then(db => {
      const tx = db.transaction(this._storeName, 'readwrite');
      const objectStore = tx.objectStore(this._storeName);
      objectStore.put(value, key);
      return tx.complete;
    });
  }

  /**
   * Wrapper on top of the idb wrapper, which simplifies deleting an entry
   * from the object store.
   * Returns a Promise that fulfills when the transaction completes.
   *
   * @private
   * @param {String} key
   * @return {Promise<T>}
   */
  delete(key) {
    return this._getDb().then(db => {
      const tx = db.transaction(this._storeName, 'readwrite');
      const objectStore = tx.objectStore(this._storeName);
      objectStore.delete(key);
      return tx.complete;
    });
  }

  /**
   * Wrapper on top of the idb wrapper, which simplifies getting a key's value
   * from the object store.
   * Returns a promise that fulfills with the value.
   *
   * @private
   * @param {String} key
   * @return {Promise<Object>}
   */
  get(key) {
    return this._getDb().then(db => {
      return db.transaction(this._storeName).objectStore(this._storeName).get(key);
    });
  }

  /**
   * Wrapper on top of the idb wrapper, which simplifies getting all the values
   * in an object store.
   * Returns a promise that fulfills with all the values.
   *
   * @private
   * @return {Promise<Array<Object>>}
   */
  getAllValues() {
    return this._getDb().then(db => {
      return db.transaction(this._storeName).objectStore(this._storeName).getAll();
    });
  }

  /**
   * Wrapper on top of the idb wrapper, which simplifies getting all the keys
   * in an object store.
   * Returns a promise that fulfills with all the keys.
   *
   * @private
   * @param {String} storeName
   * @return {Promise<Array<Object>>}
   */
  getAllKeys() {
    return this._getDb().then(db => {
      return db.transaction(this._storeName).objectStore(this._storeName).getAllKeys();
    });
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const cacheBustParamName = '_sw-precaching';
const version = 'v1';
const dbName = 'sw-precaching';
const dbVersion = '1';
const dbStorename = 'asset-revisions';

let tmpRevisionedCacheName = `sw-precaching-revisioned-${ version }`;
let tmpUnrevisionedCacheName = `sw-precaching-unrevisioned-${ version }`;
if (self && self.registration) {
  tmpRevisionedCacheName += `-${ self.registration.scope }`;
  tmpUnrevisionedCacheName += `-${ self.registration.scope }`;
}
const defaultRevisionedCacheName = tmpRevisionedCacheName;
const defaultUnrevisionedCacheName = tmpUnrevisionedCacheName;

/**
 * This class is a simple model that stores EntryID's with their current
 * revision. This is used when caching revisioned assets so that only entries
 * with different revisions are downloaded and updated.
 *
 * @private
 * @memberof module:sw-precaching
 */
class RevisionDetailsModel {
  /**
   * Constructor for RevisionDetails Model.
   */
  constructor() {
    this._idbHelper = new IDBHelper(dbName, dbVersion, dbStorename);
  }

  /**
   * This method gets the revision details for a given entryID.
   * @param {String} entryID The ID of the revision.
   * @return {Promise<String|null>} Returns a revision string or
   * null if there is no revision information.
   */
  get(entryID) {
    return this._idbHelper.get(entryID);
  }

  /**
   * This method saves the revision details to indexedDB.
   * @param {String} entryID The ID of the revision.
   * @param {String} revision The current revision for this entryID.
   * @return {Promise} Promise that resolves once the data has been saved.
   */
  put(entryID, revision) {
    return this._idbHelper.put(entryID, revision);
  }

  /**
   * This method closes the indexdDB helper. This is only used for unit testing
   * to ensure clean state between tests.
   *
   * @private
   */
  _close() {
    this._idbHelper.close();
  }
}

/**
 * This class is extended by a number of classes that take different inputs
 * and generates the required fields for a BaseCacheEntry.
 *
 * @private
 * @memberof module:sw-precaching
 */
class BaseCacheEntry {
  /**
   * This constructor expects an object and a number or required fields.
   * You shouldn't need to use this constructor directly.
   *
   * @param {Object} input
   * @param {String} input.entryID
   * @param {String} input.revision
   * @param {Request} input.request
   * @param {boolean} input.cacheBust
   */
  constructor({ entryID, revision, request, cacheBust }) {
    this.entryID = entryID;
    this.revision = revision;
    this.request = request;
    this.cacheBust = cacheBust;
  }

  /**
   * This method is required since any revisioned request needs to cache bust.
   * To ensure this is consistent, CacheManagers will make a network request
   * using this specially formatted request.
   *
   * When caching the response, it will be cached against the origin `request`,
   * removing lookup for the cachebusted URL.
   *
   * @return {Request} Returns a cache busted request if needed, otherwise
   * a normal request with credentials set to 'same-origin' and redirect set to
   * follow.
   */
  getNetworkRequest() {
    if (this.cacheBust !== true) {
      // For the RequestCacheEntry we should return it to ensure headers are
      // kept in tact and part of the request.
      return this.request;
    }

    let url = this.request.url;
    const requestOptions = {};

    if (this.cacheBust === true) {
      if ('cache' in Request.prototype) {
        // Make use of the Request cache mode where we can.
        // Reload skips the HTTP cache for outgoing requests and updates
        // the cache with the returned reponse.
        requestOptions.cache = 'reload';
      } else {
        const parsedURL = new URL(url, location);
        parsedURL.search += (parsedURL.search ? '&' : '') + encodeURIComponent(cacheBustParamName) + '=' + encodeURIComponent(this.revision);
        url = parsedURL.toString();
      }
    }

    return new Request(url, requestOptions);
  }
}

/**
 * This class will take a string and parse it as a BaseCacheEntry.
 *
 * @private
 * @memberof module:sw-precaching
 * @extends {module:sw-precaching.BaseCacheEntry}
 */
class StringCacheEntry extends BaseCacheEntry {
  /**
   * Cosntructor for StringCacheEntry.
   *
   * @param {String} url A URL to cache.
   */
  constructor(url) {
    assert.isType({ url }, 'string');
    if (url.length === 0) {
      throw ErrorFactory$3.createError('invalid-revisioned-entry', new Error('Bad url Parameter. It should be a string:' + JSON.stringify(url)));
    }

    super({
      entryID: url,
      revision: url,
      request: new Request(url),
      cacheBust: false
    });
  }
}

/**
 * This class will take an object of parameters, validate the input and
 * parse to be used as a BaseCacheEntry.
 *
 * @private
 * @memberof module:sw-precaching
 * @extends {module:sw-precaching.BaseCacheEntry}
 */
class DefaultsCacheEntry extends BaseCacheEntry {
  /**
   * This class gives most control over configuring a cache entry.
   * @param {Object} input
   * @param {String} input.entryID The ID of the entry. This is the key used
   * with IndexDB to store the revision. Normally this is just the URL.
   * @param {String} input.revision This is the revision associated with this
   * URL.
   * @param {String} input.url The URL to cache.
   * @param {boolean} input.cacheBust A boolean to indicate if this request
   * will require cache busting (i.e. the URL is not unique between SW install).
   */
  constructor({ entryID, revision, url, cacheBust }) {
    if (typeof cacheBust === 'undefined') {
      cacheBust = true;
    }
    if (typeof entryID === 'undefined') {
      entryID = new URL(url, location).toString();
    }

    assert.isType({ revision }, 'string');
    if (revision.length === 0) {
      throw ErrorFactory$3.createError('invalid-revisioned-entry', new Error('Bad revision Parameter. It should be a string with at ' + 'least one character: ' + JSON.stringify(revision)));
    }

    assert.isType({ url }, 'string');
    if (url.length === 0) {
      throw ErrorFactory$3.createError('invalid-revisioned-entry', new Error('Bad url Parameter. It should be a string:' + JSON.stringify(url)));
    }

    assert.isType({ entryID }, 'string');
    if (entryID.length === 0) {
      throw ErrorFactory$3.createError('invalid-revisioned-entry', new Error('Bad entryID Parameter. It should be a string with at ' + 'least one character: ' + JSON.stringify(entryID)));
    }

    assert.isType({ cacheBust }, 'boolean');

    super({
      entryID,
      revision,
      request: new Request(url),
      cacheBust
    });
  }
}

/**
 * This class extends a lot of the internal methods from BaseCacheManager
 * to manage caching of revisioned assets.
 *
 * @private
 * @memberof module:sw-precaching
 * @extends {module:sw-precaching.BaseCacheManager}
 */
class RevisionedCacheManager extends BaseCacheManager {
  /**
   * Constructor for RevisionedCacheManager
   */
  constructor() {
    super(defaultRevisionedCacheName);

    this._revisionDetailsModel = new RevisionDetailsModel();
  }

  /**
   * This method will add the entries to the install list.
   * This will manage duplicate entries and perform the caching during
   * the install step.
   *
   * @example
   *
   * revisionedManager.cache([
   *   '/styles/hello.1234.css',
   *   {
   *     url: '/images/logo.png',
   *     revision: '1234'
   *   }
   * ]);
   *
   * @param {Array<String|Object>} rawEntries A raw entry that can be
   * parsed into a BaseCacheEntry.
   */
  cache(rawEntries) {
    // This method is here to provide useful docs.
    super.cache(rawEntries);
  }

  /**
   * This method ensures that the file entry in the maniest is valid and
   * can be parsed as a BaseCacheEntry.
   *
   * @private
   * @abstract
   * @param {String | Object} input Either a URL string
   * or an object with a `url`, `revision` and optional `cacheBust` parameter.
   * @return {BaseCacheEntry} Returns a parsed version of the file entry.
   */
  _parseEntry(input) {
    if (typeof input === 'undefined' || input === null) {
      throw ErrorFactory$3.createError('invalid-revisioned-entry', new Error('Invalid file entry: ' + JSON.stringify(input)));
    }

    let precacheEntry;
    switch (typeof input) {
      case 'string':
        precacheEntry = new StringCacheEntry(input);
        break;
      case 'object':
        precacheEntry = new DefaultsCacheEntry(input);
        break;
      default:
        throw ErrorFactory$3.createError('invalid-revisioned-entry', new Error('Invalid file entry: ' + JSON.stringify(precacheEntry)));
    }

    return precacheEntry;
  }

  /**
   * If a dupe entry exists, check the revision. If the revisions are the same
   * it's simply a duplicate entry. If they are different, we have two
   * identical requests with two different revisions which will put this
   * module into a bad state.
   *
   * @private
   * @param {BaseCacheEntry} newEntry The entry that is to be cached.
   * @param {BaseCacheEntry} previousEntry The entry that is currently cached.
   */
  _onDuplicateInstallEntryFound(newEntry, previousEntry) {
    if (previousEntry.revision !== newEntry.revision) {
      throw ErrorFactory$3.createError('duplicate-entry-diff-revisions', new Error(`${ JSON.stringify(previousEntry) } <=> ` + `${ JSON.stringify(newEntry) }`));
    }
  }

  /**
   * This method confirms with a precacheEntry is already in the cache with the
   * appropriate revision.
   * If the revision is known, the requested `precacheEntry.revision` is saved
   * and the cache entry exists for the `precacheEntry.path` this method
   * will return true.
   *
   * @private
   * @param {BaseCacheEntry} precacheEntry A entry with `path` and `revision`
   * parameters.
   * @return {Promise<Boolean>} Returns true if the precacheEntry is already
   * cached, false otherwise.
   */
  _isAlreadyCached(precacheEntry) {
    var _this = this;

    return asyncToGenerator(function* () {
      const revisionDetails = yield _this._revisionDetailsModel.get(precacheEntry.entryID);
      if (revisionDetails !== precacheEntry.revision) {
        return false;
      }

      const openCache = yield _this._getCache();
      const cachedResponse = yield openCache.match(precacheEntry.request);
      return cachedResponse ? true : false;
    })();
  }

  /**
   * @private
   * @param {BaseCacheEntry} precacheEntry A file entry with `path` and
   * `revision` parameters.
   */
  _onEntryCached(precacheEntry) {
    var _this2 = this;

    return asyncToGenerator(function* () {
      yield _this2._revisionDetailsModel.put(precacheEntry.entryID, precacheEntry.revision);
    })();
  }

  /**
   * This method closes the indexdDB helper. This is used for unit testing
   * to ensure cleanup between tests.
   * @private
   */
  _close() {
    this._revisionDetailsModel._close();
  }
}

/**
 * This class will take a Request object and parse it into a BaseCacheEntry.
 *
 * @private
 * @memberof module:sw-precaching
 * @extends {module:sw-precaching.BaseCacheEntry}
 */
class RequestCacheEntry extends BaseCacheEntry {
  /**
   * This is useful for caching unrevisioned requests that require
   * special headers etc.
   * @param {Request} request A request to be cached.
   */
  constructor(request) {
    if (!(request instanceof Request)) {
      throw ErrorFactory$3.createError('invalid-unrevisioned-entry', new Error('Invalid file entry: ' + JSON.stringify(request)));
    }

    super({
      entryID: request.url,
      request: request,
      cacheBust: false
    });
  }
}

/**
 * This class extends a lot of the internal methods from BaseCacheManager
 * to manage caching of unrevisioned assets.
 *
 * @private
 * @memberof module:sw-precaching
 * @extends {module:sw-precaching.BaseCacheManager}
 */
class UnrevisionedCacheManager extends BaseCacheManager {
  /**
   * Constructor for UnreivisionedCacheManager
   */
  constructor() {
    super(defaultUnrevisionedCacheName);
  }

  /**
   * This method will add the entries to the install list.
   * This will manage duplicate entries and perform the caching during
   * the install step.
   *
   * @example
   *
   * revisionedManager.cache([
   *   '/styles/hello.css',
   *   new Request('/images/logo.png', {
   *     // Custom Request Options.
   *   })
   * ]);
   *
   * @param {Array<String|Request>} rawEntries A raw entry that can be
   * parsed into a BaseCacheEntry.
   */
  cache(rawEntries) {
    // This method is here to provide useful docs.
    super.cache(rawEntries);
  }

  /**
   * This method ensures that the file entry in the maniest is valid and
   * can be parsed as a BaseCacheEntry.
   *
   * @private
   * @abstract
   * @param {String | Request} input Either a URL string or a Request.
   * @return {BaseCacheEntry} Returns a parsed version of the file entry.
   */
  _parseEntry(input) {
    if (typeof input === 'undefined' || input === null) {
      throw ErrorFactory$3.createError('invalid-unrevisioned-entry', new Error('Invalid file entry: ' + JSON.stringify(input)));
    }

    if (typeof input === 'string') {
      return new StringCacheEntry(input);
    } else if (input instanceof Request) {
      return new RequestCacheEntry(input);
    } else {
      throw ErrorFactory$3.createError('invalid-unrevisioned-entry', new Error('Invalid file entry: ' + JSON.stringify(input)));
    }
  }

  /**
   * @private
   * @param {BaseCacheEntry} newEntry The entry that is to be cached.
   * @param {BaseCacheEntry} previousEntry The entry that is currently cached.
   */
  _onDuplicateInstallEntryFound(newEntry, previousEntry) {}
  // NOOP. Just ignore duplicate entries.


  /**
   * We always want to override previously cached versions.
   * @private
   * @param {BaseCacheEntry} precacheEntry A file entry with `path` and
   * `revision` parameters.
   * @return {Promise<Boolean>} Returns true is the fileEntry is already
   * cached, false otherwise.
   */
  _isAlreadyCached(precacheEntry) {
    return asyncToGenerator(function* () {
      return false;
    })();
  }

  /**
   * @private
   * @param {BaseCacheEntry} precacheEntry A file entry with `path` and
   * `revision` parameters.
   */
  _onEntryCached(precacheEntry) {
    // NOOP
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The PrecacheManager is the top level API you are likely to use with
 * the sw-precaching module.
 *
 * This class will set up the install listener and orchestrate the caching
 * of assets.
 *
 * @memberof module:sw-precaching
 */
class PrecacheManager {
  /**
   * Creating a PrecacheManager will add an install and activate event listener
   * to your service worker. This allows the manager to cache assets and
   * tidy up the no longer required assets.
   */
  constructor() {
    this._eventsRegistered = false;
    this._revisionedManager = new RevisionedCacheManager();
    this._unrevisionedManager = new UnrevisionedCacheManager();
    this._registerEvents();
  }

  /**
   * @private
   */
  _registerEvents() {
    if (this._eventsRegistered) {
      // Only need to register events once.
      return;
    }

    this._eventsRegistered = true;

    self.addEventListener('install', event => {
      const promiseChain = Promise.all([this._revisionedManager._performInstallStep(), this._unrevisionedManager._performInstallStep()]).then(() => {
        // Closed indexedDB now that we are done with the install step
        this._close();
      }).catch(err => {
        this._close();

        throw err;
      });

      event.waitUntil(promiseChain);
    });

    self.addEventListener('activate', event => {
      const promiseChain = Promise.all([this._revisionedManager._cleanUpOldEntries(), this._unrevisionedManager._cleanUpOldEntries()]).then(() => {
        // Closed indexedDB now that we are done with the install step
        this._close();
      }).catch(err => {
        this._close();

        throw err;
      });

      event.waitUntil(promiseChain);
    });
  }

  /**
   * To cache revisioned assets (i.e. urls / assets that you have a revision
   * for) can be efficiently cached and updated with this method.
   * @param {Object} input
   * @param {Array<String|Object>} input.revisionedFiles An array of URL strings
   * , which should have revisioning in the file name (i.e. hello.1234.css)) or
   * an object with a `url` and `revision` parameter.
   *
   * @example
   * precacheManager.cacheRevisioned({
   *   revisionedFiles: [
   *     // Revision is in the file name
   *     '/styles/main.1234.css',
   *
   *     // Object of url and revision can be used as well
   *     {
   *       url: '/',
   *       revision: '1234'
   *     },
   *   ]
   * });
   */
  cacheRevisioned({ revisionedFiles } = {}) {
    assert.isInstance({ revisionedFiles }, Array);
    this._revisionedManager.cache(revisionedFiles);
  }

  /**
   * To cache URLs or assets where you don't know the revisioning, should
   * be cached with this method. This method will always cache these files
   * on install, regardless of whether they are already cached or not.
   * This ensures they are up-to-date after a new service worker install.
   * @param {Object} input
   * @param {Array<String|Request>} input.unrevisionedFiles An array of URL
   * strings or a Request object, which allows you to define custom headers.
   *
   * @example
   * precacheManager.cacheUnrevisioned({
   *   unrevisionedFiles: [
   *     // Normal URL string
   *     '/example/',
   *
   *     // Request with headers
   *     new Request(
   *       '/user-info.json',
   *       {
   *         headers: {
   *           'CustomHeader': 'Hello World.'
   *         }
   *       }
   *     ),
   *   ]
   * });
   */
  cacheUnrevisioned({ unrevisionedFiles } = {}) {
    assert.isInstance({ unrevisionedFiles }, Array);
    this._unrevisionedManager.cache(unrevisionedFiles);
  }

  /**
   * @private
   */
  _close() {
    this._revisionedManager._close();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The precaching module provides helpers that make it easy to cache files
 * during the install step of your service worker.
 *
 * The revisioned caching will cache bust requests where appropriate and
 * only cache assets that have a changed revision asset compared to
 * the currently cached value.
 *
 * @example
 * importScripts('/<Path to Module>/build/sw-precaching.min.js');
 *
 * const precacheManager = new goog.precaching.PrecacheManager();
 * precacheManager.cacheRevisioned({
 *   revisionedFiles: [
 *     '/styles/main.1234.css',
 *     {
 *       url: '/',
 *       revision: '1234'
 *     }
 *   ],
 * });
 *
 * precacheManager.cacheUnrevisioned({
 *   unrevisionedFiles: [
 *     '/',
 *     '/images/logo.png'
 *   ]
 * });
 *
 * @module sw-precaching
 */
if (!assert.isSWEnv()) {
  // We are not running in a service worker, print error message
  throw ErrorFactory$3.createError('not-in-sw');
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const idbName = `sw-cache-expiration-${ self.registration.scope }`;
const idbVersion = 1;
const urlPropertyName = 'url';
const timestampPropertyName = 'timestamp';

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-cache-expiration
 *
 * @example
 * // Used as an automatically invoked as "behavior" by a RequestWrapper:
 *
 * const requestWrapper = new goog.runtimeCaching.RequestWrapper({
 *   cacheName: 'runtime-cache',
 *   behaviors: [
 *     new goog.cacheExpiration.Behavior({maxEntries: 10})
 *   ]
 * });
 *
 * // Set up a route to match any requests made against the example.com domain.
 * // The requests will be handled with a stale-while-revalidate policy, and the
 * // cache size will be capped at 10 entries.
 * const route = new goog.routing.RegExpRoute({
 *   match: ({url}) => url.domain === 'example.com',
 *   handler: new goog.runtimeCaching.StaleWhileRevalidate({requestWrapper})
 * });
 *
 * @example
 * // Explicitly invoked usage independent of the goog.routing framework, via
 * // the expireOldEntries() method:
 *
 * // TODO: Write sample code.
 */
class Behavior {
  /**
   * Creates a new `Behavior` instance, which is used to remove entries from a
   * [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache) once
   * certain criteria—maximum number of entries, age of entry, or both—is met.
   *
   * @param {Object} input The input object to this function.
   * @param {Number} [input.maxEntries] The maximum size of the cache. Entries
   *        will be expired using a LRU policy once the cache reaches this size.
   * @param {Number} [input.maxAgeSeconds] The maximum age for fresh entries.
   */
  constructor({ maxEntries, maxAgeSeconds } = {}) {
    assert.atLeastOne({ maxEntries, maxAgeSeconds });
    if (maxEntries !== undefined) {
      assert.isType({ maxEntries }, 'number');
    }
    if (maxAgeSeconds !== undefined) {
      assert.isType({ maxAgeSeconds }, 'number');
    }

    this.maxEntries = maxEntries;
    this.maxAgeSeconds = maxAgeSeconds;

    // These are used to keep track of open IndexDB and Caches for a given name.
    this._dbs = new Map();
    this._caches = new Map();
  }

  /**
   * Returns a promise for the IndexedDB database used to keep track of state.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @return {DB} An open DB instance.
   */
  getDB({ cacheName }) {
    var _this = this;

    return asyncToGenerator(function* () {
      if (!_this._dbs.has(cacheName)) {
        const openDb = yield idb.open(idbName, idbVersion, function (upgradeDB) {
          const objectStore = upgradeDB.createObjectStore(cacheName, { keyPath: urlPropertyName });
          objectStore.createIndex(timestampPropertyName, timestampPropertyName, { unique: false });
        });
        _this._dbs.set(cacheName, openDb);
      }

      return _this._dbs.get(cacheName);
    })();
  }

  /**
   * Returns a promise for an open Cache instance named `cacheName`.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @return {Cache} An open Cache instance.
   */
  getCache({ cacheName }) {
    var _this2 = this;

    return asyncToGenerator(function* () {
      if (!_this2._caches.has(cacheName)) {
        const openCache = yield caches.open(cacheName);
        _this2._caches.set(cacheName, openCache);
      }

      return _this2._caches.get(cacheName);
    })();
  }

  /**
   * A "lifecycle" callback that will be triggered automatically by the
   * goog.runtimeCaching handlers when an entry is added to a cache.
   *
   * Developers would normally not call this method directly; instead,
   * [`updateTimestamp`](#updateTimestamp) combined with
   * [`expireEntries`](#expireEntries) provides equivalent behavior.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @param {Response} input.newResponse The new value in the cache.
   */
  cacheDidUpdate({ cacheName, newResponse } = {}) {
    assert.isType({ cacheName }, 'string');
    assert.isInstance({ newResponse }, Response);

    const now = Date.now();
    this.updateTimestamp({ cacheName, now, url: newResponse.url }).then(() => {
      this.expireEntries({ cacheName, now });
    });
  }

  /**
   * Updates the timestamp stored in IndexedDB for `url` to be equal to `now`.
   *
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @param {string} input.url
   * @param {Number} [input.now] A timestamp. Defaults to the current time.
   */
  updateTimestamp({ cacheName, url, now }) {
    var _this3 = this;

    return asyncToGenerator(function* () {
      assert.isType({ url }, 'string');

      if (typeof now === 'undefined') {
        now = Date.now();
      }

      const db = yield _this3.getDB({ cacheName });
      const tx = db.transaction(cacheName, 'readwrite');
      tx.objectStore(cacheName).put({
        [timestampPropertyName]: now,
        [urlPropertyName]: url
      });

      yield tx.complete;
    })();
  }

  /**
   * Expires entries, both based on the the maximum age and the maximum number
   * of entries, depending on how this instance is configured.
   *
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @param {Number} [input.now] A timestamp. Defaults to the current time.
   * @return {Array<string>} A list of the URLs that were expired.
   */
  expireEntries({ cacheName, now } = {}) {
    var _this4 = this;

    return asyncToGenerator(function* () {
      if (typeof now === 'undefined') {
        now = Date.now();
      }

      // First, expire old entries, if maxAgeSeconds is set.
      const oldEntries = _this4.maxAgeSeconds ? yield _this4.findOldEntries({ cacheName, now }) : [];

      // Once that's done, check for the maximum size.
      const extraEntries = _this4.maxEntries ? yield _this4.findExtraEntries({ cacheName }) : [];

      // Use a Set to remove any duplicates following the concatenation, then
      // convert back into an array.
      const urls = [...new Set(oldEntries.concat(extraEntries))];
      yield _this4.deleteFromCacheAndIDB({ cacheName, urls });

      return urls;
    })();
  }

  /**
   * Expires entries based on the the maximum age.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @param {Number} [input.now] A timestamp.
   * @return {Array<string>} A list of the URLs that were expired.
   */
  findOldEntries({ cacheName, now } = {}) {
    var _this5 = this;

    return asyncToGenerator(function* () {
      assert.isType({ now }, 'number');

      const expireOlderThan = now - _this5.maxAgeSeconds * 1000;
      const urls = [];
      const db = yield _this5.getDB({ cacheName });
      const tx = db.transaction(cacheName, 'readonly');
      const store = tx.objectStore(cacheName);
      const timestampIndex = store.index(timestampPropertyName);

      timestampIndex.iterateCursor(function (cursor) {
        if (!cursor) {
          return;
        }

        if (cursor.value[timestampPropertyName] < expireOlderThan) {
          urls.push(cursor.value[urlPropertyName]);
        }

        cursor.continue();
      });

      yield tx.complete;
      return urls;
    })();
  }

  /**
   * Expires entries base on the the maximum cache size.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @return {Array<string>} A list of the URLs that were expired.
   */
  findExtraEntries({ cacheName }) {
    var _this6 = this;

    return asyncToGenerator(function* () {
      const urls = [];
      const db = yield _this6.getDB({ cacheName });
      const tx = db.transaction(cacheName, 'readonly');
      const store = tx.objectStore(cacheName);
      const timestampIndex = store.index(timestampPropertyName);
      const initialCount = yield timestampIndex.count();

      if (initialCount > _this6.maxEntries) {
        timestampIndex.iterateCursor(function (cursor) {
          if (!cursor) {
            return;
          }

          urls.push(cursor.value[urlPropertyName]);

          if (initialCount - urls.length > _this6.maxEntries) {
            cursor.continue();
          }
        });
      }

      yield tx.complete;
      return urls;
    })();
  }

  /**
   * Removes entries corresponding to each of the URLs from both the Cache
   * Storage API and from IndexedDB.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @param {Array<string>} urls The URLs to delete.
   */
  deleteFromCacheAndIDB({ cacheName, urls } = {}) {
    var _this7 = this;

    return asyncToGenerator(function* () {
      assert.isInstance({ urls }, Array);

      if (urls.length > 0) {
        const cache = yield _this7.getCache({ cacheName });
        const db = yield _this7.getDB({ cacheName });

        yield urls.forEach((() => {
          var _ref = asyncToGenerator(function* (url) {
            yield cache.delete(url);
            const tx = db.transaction(cacheName, 'readwrite');
            const store = tx.objectStore(cacheName);
            yield store.delete(url);
            yield tx.complete;
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        })());
      }
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * sw-cache-expiration Module
 * @module sw-cache-expiration
 */

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The value `'CACHE_UPDATED'`, used as the `type` field of the update message.
 *
 * @memberof module:sw-broadcast-cache-update
 * @type {string}
 */
const cacheUpdatedMessageType = 'CACHE_UPDATED';

/**
 * The default headers to compare when determining whether two `Response`
 * objects are different.
 *
 * @private
 * @type {Array<string>}
 */
const defaultHeadersToCheck = ['content-length', 'etag', 'last-modified'];

/**
 * The value `'sw-broadcast-cache-update'`, used as the `meta` field of the
 * update message.
 *
 * @private
 * @type {string}
 */
const defaultSource = 'sw-broadcast-cache-update';

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * Uses the {@link https://developers.google.com/web/updates/2016/09/broadcastchannel|Broadcast Channel API}
 * to notify interested subscribers about a change to a cached resource.
 *
 * You would not normally call this method directly; it's called automatically
 * by an instance of the {@link Behavior} class. It's exposed here for the
 * benefit of developers who would rather not use the full `Behavior`
 * implementation.
 *
 * The message that's posted takes the following format, inspired by the
 * [Flux standard action](https://github.com/acdlite/flux-standard-action#introduction)
 * format. (Usage of [Flux](https://facebook.github.io/flux/) itself is not at
 * all required.)
 *
 * ```
 * {
 *   type: 'CACHE_UPDATED',
 *   meta: 'sw-broadcast-cache-update',
 *   payload: {
 *     cacheName: 'the-cache-name',
 *     updatedUrl: 'https://example.com/'
 *   }
 * }
 * ```
 *
 * @memberof module:sw-broadcast-cache-update
 * @type {function}
 *
 * @param {Object} input
 * @param {BroadcastChannel} input.channel The `BroadcastChannel` to use.
 * @param {string} input.cacheName The name of the cache in which the updated
 *        `Response` was stored.
 * @param {string} input.url The URL associated with the updated `Response`.
 * @param {string} input.source A string identifying this library as the source
 *        of the update message.
 */
function broadcastUpdate({ channel, cacheName, url, source }) {
  assert.isInstance({ channel }, BroadcastChannel);
  assert.isType({ cacheName }, 'string');
  assert.isType({ source }, 'string');
  assert.isType({ url }, 'string');

  channel.postMessage({
    type: cacheUpdatedMessageType,
    meta: source,
    payload: {
      cacheName: cacheName,
      updatedUrl: url
    }
  });
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * Given two `Response`s, compares several header values to see if they are
 * the same or not.
 *
 * @memberof module:sw-broadcast-cache-update
 * @type {function}
 *
 * @param {Object} input
 * @param {Response} input.first One of the `Response`s.
 * @param {Response} input.second Another of the `Response`s.
 * @param {Array<string>} input.headersToCheck A list of headers that will be
 *        used to determine whether the `Response`s differ.
 * @return {boolean} Whether or not the `Response` objects are assumed to be
 *         the same.
 */
function responsesAreSame({ first, second, headersToCheck }) {
  assert.isInstance({ first }, Response);
  assert.isInstance({ second }, Response);
  assert.isInstance({ headersToCheck }, Array);

  return headersToCheck.every(header => {
    return first.headers.has(header) === second.headers.has(header) && first.headers.get(header) === second.headers.get(header);
  });
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-broadcast-cache-update
 *
 * @example
 * // Used as an automatically invoked as "behavior" by a RequestWrapper:
 *
 * const requestWrapper = new goog.runtimeCaching.RequestWrapper({
 *   cacheName: 'runtime-cache',
 *   behaviors: [
 *     new goog.broadcastCacheUpdate.Behavior({channelName: 'cache-updates'})
 *   ]
 * });
 *
 * // Set up a route to match any requests made against the example.com domain.
 * // The requests will be handled with a stale-while-revalidate policy, and the
 * // cache update notification behavior, as configured in requestWrapper, will
 * // be automatically applied.
 * const route = new goog.routing.RegExpRoute({
 *   match: ({url}) => url.domain === 'example.com',
 *   handler: new goog.runtimeCaching.StaleWhileRevalidate({requestWrapper})
 * });
 *
 * @example
 * // Explicitly invoked usage independent of the goog.routing framework, via
 * // the notifyIfUpdated() method:
 *
 * const cacheUpdateBehavior = new goog.broadcastCacheUpdates.Behavior({
 *   channelName: 'cache-updates'
 * });
 *
 * const url = 'https://example.com';
 * const cacheName = 'runtime-cache';
 *
 * const cache = await caches.open(cacheName);
 * const oldResponse = await cache.match(url);
 * const newResponse = await fetch(url);
 * await cache.put(url, newResponse);
 *
 * // Only check for an update if there was a previously cached Response.
 * if (oldResponse) {
 *   cacheUpdateBehavior.notifyIfUpdated({
 *     first: oldResponse,
 *     second: newResponse,
 *     cacheName
 *   });
 * }
 */
class Behavior$1 {
  /**
   * Creates a new `Behavior` instance, which is used to compare two
   * [Responses](https://developer.mozilla.org/en-US/docs/Web/API/Response)
   * and use the {@link https://developers.google.com/web/updates/2016/09/broadcastchannel|Broadcast Channel API}
   * to notify interested parties when those Responses differ.
   *
   * For efficiency's sake, the underlying response bodies are not compared;
   * only specific response headers are checked.
   *
   * @param {Object} input The input object to this function.
   * @param {string} input.channelName The name that will be used when creating
   *        the [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/BroadcastChannel).
   * @param {Array<string>} input.headersToCheck A list of headers that will be
   *        used to determine whether the `Response`s differ. If not provided,
   *        the values `['content-length', 'etag', 'last-modified']` are used.
   * @param {string} input.source An attribution value that will be used in the
   *        broadcast message to indicate where the update originated. If not
   *        provided, a
   *        {@link constants#defaultSource|default value} will be used.
   */
  constructor({ channelName, headersToCheck, source }) {
    assert.isType({ channelName }, 'string');

    this.channelName = channelName;
    this.headersToCheck = headersToCheck || defaultHeadersToCheck;
    this.source = source || defaultSource;
  }

  /**
   * @private
   * @return {BroadcastChannel} The underlying
   *          [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/BroadcastChannel)
   *          instance used for broadcasting updates.
   */
  get channel() {
    if (!this._channel) {
      this._channel = new BroadcastChannel(this.channelName);
    }
    return this._channel;
  }

  /**
   * A "lifecycle" callback that will be triggered automatically by the
   * goog.runtimeCaching handlers when an entry is added to a cache.
   *
   * Developers would normally not call this method directly; instead,
   * [`notifyIfUpdated`](#notifyIfUpdated) provides equivalent functionality
   * with a slightly more efficient interface.
   *
   * @private
   * @param {Object} input The input object to this function.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   * @param {Response} [input.oldResponse] The previous cached value, if any.
   * @param {Response} input.newResponse The new value in the cache.
   */
  cacheDidUpdate({ cacheName, oldResponse, newResponse }) {
    assert.isType({ cacheName }, 'string');
    assert.isInstance({ newResponse }, Response);

    if (oldResponse) {
      this.notifyIfUpdated({
        cacheName,
        first: oldResponse,
        second: newResponse });
    }
  }

  /**
   * An explicit method to call from your own code to trigger the comparison of
   * two [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
   * and fire off a notification via the
   * {@link https://developers.google.com/web/updates/2016/09/broadcastchannel|Broadcast Channel API}
   * if they differ.
   *
   * @param {Object} input The input object to this function.
   * @param {Response} input.first One of the responses to compare.
   *        This should not be an {@link http://stackoverflow.com/questions/39109789|opaque response}.
   * @param {Response} input.second Another of the respones to compare.
   *        This should not be an {@link http://stackoverflow.com/questions/39109789|opaque response}.
   * @param {string} input.cacheName Name of the cache the Responses belong to.
   */
  notifyIfUpdated({ first, second, cacheName }) {
    assert.isType({ cacheName }, 'string');

    if (!responsesAreSame({ first, second, headersToCheck: this.headersToCheck })) {
      broadcastUpdate({ cacheName, url: second.url,
        channel: this.channel, source: this.source });
    }
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * sw-broadcast-cache-update Module
 * @module sw-broadcast-cache-update
 */

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The default cache name, used by RequestWrapper when there's no name provided.
 * It combines a constant prefix with the `registration.scope` value associated
 * with the current service worker, ensuring that multiple service workers used
 * on the same origin will have different default caches.
 *
 * @type {string}
 * @memberof module:sw-runtime-caching
 */
const defaultCacheName = `sw-runtime-caching-${ self.registration.scope }`;

/**
 * A list of the callback methdo names that the RequestWrapper might trigger.
 *
 * @private
 * @type {Array.<string>}
 * @memberof module:sw-runtime-caching
 */
const behaviorCallbacks = ['cacheDidUpdate', 'cacheWillUpdate', 'fetchDidFail', 'requestWillFetch'];

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const errors$2 = {
    'multiple-cache-will-update-behaviors': 'You cannot register more than one ' + 'behavior that implements cacheWillUpdate.'
};

var ErrorFactory$4 = new ErrorFactory$1(errors$2);

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * This class is used by the various subclasses of `Handler` to configure the
 * cache name and any desired request/cache behaviors.
 *
 * It automatically triggers any registered behaviors at the appropriate time.
 * The current set of behavior callbacks, along with the parameters they're
 * given and when they're called, is:
 *
 *   - `cacheDidUpdate({cacheName, oldResponse, newResponse})`: Called whenever
 *   a new entry is written to the cache.
 *   - `fetchDidFail({request})`: Called whenever a network request fails.
 *   - `requestWillFetch({request})`: Called prior to making a network request.
 *
 * @memberof module:sw-runtime-caching
 */
class RequestWrapper {
  /**
   * @param {string} [cacheName] The name of the cache to use for Handlers that
   *        involve caching. If none is provided, a default name that uses the
   *        current service worker scope will be used.
   * @param {Array.<Object>} [behaviors] Any behaviors that should be invoked.
   * @param {Object} [fetchOptions] Values passed along to the
   *        [`init`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters)
   *        of all `fetch()` requests made by this wrapper.
   * @param {Object} [matchOptions] Values passed along to the
   *        [`options`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match#Parameters)
   *        of all cache `match()` requests made by this wrapper.
   */
  constructor({ cacheName, behaviors, fetchOptions, matchOptions } = {}) {
    if (cacheName) {
      assert.isType({ cacheName }, 'string');
      this.cacheName = cacheName;
    } else {
      this.cacheName = defaultCacheName;
    }

    if (fetchOptions) {
      assert.isType({ fetchOptions }, 'object');
      this.fetchOptions = fetchOptions;
    }

    if (matchOptions) {
      assert.isType({ matchOptions }, 'object');
      this.matchOptions = matchOptions;
    }

    this.behaviorCallbacks = {};

    if (behaviors) {
      assert.isInstance({ behaviors }, Array);

      behaviors.forEach(behavior => {
        for (let callbackName of behaviorCallbacks) {
          if (typeof behavior[callbackName] === 'function') {
            if (!this.behaviorCallbacks[callbackName]) {
              this.behaviorCallbacks[callbackName] = [];
            }
            this.behaviorCallbacks[callbackName].push(behavior[callbackName].bind(behavior));
          }
        }
      });
    }

    if (this.behaviorCallbacks.cacheWillUpdate) {
      if (this.behaviorCallbacks.cacheWillUpdate.length !== 1) {
        throw ErrorFactory$4.createError('multiple-cache-will-update-behaviors');
      }
    }
  }

  /**
   * @return {Cache} The cache for this RequestWrapper.
   */
  getCache() {
    var _this = this;

    return asyncToGenerator(function* () {
      if (!_this._cache) {
        _this._cache = yield caches.open(_this.cacheName);
      }
      return _this._cache;
    })();
  }

  /**
   * Wraps `cache.match()`, using the previously configured cache name and match
   * options.
   *
   * @param {Object} input
   * @param {Request|string} input.request The key for the cache lookup.
   * @return {Promise.<Response>} The cached response.
   */
  match({ request }) {
    var _this2 = this;

    return asyncToGenerator(function* () {
      assert.atLeastOne({ request });

      const cache = yield _this2.getCache();
      return yield cache.match(request, _this2.matchOptions);
    })();
  }

  /**
   * Wraps `fetch()`, and calls any `fetchDidFail` callbacks from the
   * registered behaviors if the request fails.
   *
   * @param {Object} input
   * @param {Request|string} input.request The request or URL to be fetched.
   * @return {Promise.<Response>} The network response.
   */
  fetch({ request }) {
    var _this3 = this;

    return asyncToGenerator(function* () {
      assert.atLeastOne({ request });

      return yield fetch(request, _this3.fetchOptions).catch(function (error) {
        if (_this3.behaviorCallbacks.fetchDidFail) {
          for (let callback of _this3.behaviorCallbacks.fetchDidFail) {
            callback({ request });
          }
        }

        throw error;
      });
    })();
  }

  /**
   * Combines both fetching and caching, using the previously configured options
   * and calling the appropriate behaviors.
   *
   * By default, responses with a status of [2xx](https://fetch.spec.whatwg.org/#ok-status)
   * will be considered valid and cacheable, but this could be overridden by
   * configuring one or more behaviors that implement the `cacheWillUpdate`
   * lifecycle callback.
   *
   * @param {Object} input
   * @param {Request} input.request The request to fetch.
   * @param {boolean} [input.waitOnCache] `true` means the method should wait
   *        for the cache.put() to complete before returning. The default value
   *        of `false` means return without waiting.
   * @return {Promise.<Response>} The network response.
   */
  fetchAndCache({ request, waitOnCache }) {
    var _this4 = this;

    return asyncToGenerator(function* () {
      assert.atLeastOne({ request });

      let cachingComplete;
      const response = yield _this4.fetch({ request });

      // .ok is true if the response status is 2xx. That's the default condition.
      let cacheable = response.ok;
      if (_this4.behaviorCallbacks.cacheWillUpdate) {
        cacheable = _this4.behaviorCallbacks.cacheWillUpdate[0]({ request, response });
      }

      if (cacheable) {
        const newResponse = response.clone();

        // cacheDelay is a promise that may or may not be used to delay the
        // completion of this method, depending on the value of `waitOnCache`.
        cachingComplete = _this4.getCache().then((() => {
          var _ref = asyncToGenerator(function* (cache) {
            let oldResponse;

            // Only bother getting the old response if the new response isn't opaque
            // and there's at least one cacheDidUpdateCallbacks. Otherwise, we don't
            // need it.
            if (response.type !== 'opaque' && _this4.behaviorCallbacks.cacheDidUpdate) {
              oldResponse = yield _this4.match({ request });
            }

            // Regardless of whether or not we'll end up invoking
            // cacheDidUpdateCallbacks, wait until the cache is updated.
            yield cache.put(request, newResponse);

            for (let callback of _this4.behaviorCallbacks.cacheDidUpdate || []) {
              callback({ cacheName: _this4.cacheName, oldResponse, newResponse });
            }
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        })());
      }

      // Only conditionally await the caching completion, giving developers the
      // option of returning early for, e.g., read-through-caching scenarios.
      if (waitOnCache && cachingComplete) {
        yield cachingComplete;
      }

      return response;
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * This a base class meant to be extended by other classes that implement
 * specific request strategies.
 *
 * @memberof module:sw-runtime-caching
 */
class Handler {
  /**
   * @param {Object} input
   * @param {RequestWrapper} [input.requestWrapper] An optional `RequestWrapper`
   *        that is used to configure the cache name and request behaviors. If
   *        not provided, a new `RequestWrapper` using the
   *        [default cache name](#defaultCacheName) will be used.
   */
  constructor({ requestWrapper } = {}) {
    if (requestWrapper) {
      this.requestWrapper = requestWrapper;
    } else {
      this.requestWrapper = new RequestWrapper();
    }
  }

  /**
   * An abstract method that each subclass must implement.
   *
   * @abstract
   * @param {Object} input
   * @param {FetchEvent} input.event The event that triggered the service
   *        worker's fetch handler.
   * @param {Object} [input.params] Additional parameters that might be passed
   *        in to the method. If used in conjunction with the `Route` class,
   *        then the return value from the `match` function in `Route` will
   *        be passed in via this parameter.
   * @return {Promise.<Response>} A response, obtained from whichever strategy
   *         is implemented.
   */
  handle({ event, params } = {}) {
    throw Error('This abstract method must be implemented in a subclass.');
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-runtime-caching
 * @extends module:sw-runtime-caching.Handler
 */
class CacheFirst extends Handler {
  /**
   * An implementation of a [cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
   * request strategy.
   *
   * @alias CacheFirst.handle
   * @param {Object} input
   * @param {FetchEvent} input.event The event that triggered the service
   *        worker's fetch handler.
   * @return {Promise.<Response>} The response, either from the cache,
   *          or if that isn't available, from the network.
   */
  handle({ event } = {}) {
    var _this = this;

    return asyncToGenerator(function* () {
      assert.isInstance({ event }, FetchEvent);

      const cachedResponse = yield _this.requestWrapper.match({
        request: event.request
      });

      return cachedResponse || (yield _this.requestWrapper.fetchAndCache({
        request: event.request
      }));
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-runtime-caching
 * @extends module:sw-runtime-caching.Handler
 */
class CacheOnly extends Handler {
  /**
   * An implementation of a [cache-only](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only)
   * request strategy.
   *
   * The advantage to using this vs. directly calling `caches.match()` is that
   * it will use the cache configuration and trigger the behaviors defined in
   * the underlying `RequestWrapper`.
   *
   * @alias CacheOnly.handle
   * @param {Object} input An object wrapper for the underlying parameters.
   * @param {FetchEvent} input.event The event that triggered the service
   *        worker's fetch handler.
   * @return {Promise.<Response>} The response from the cache.
   */
  handle({ event } = {}) {
    var _this = this;

    return asyncToGenerator(function* () {
      assert.isInstance({ event }, FetchEvent);

      return yield _this.requestWrapper.match({ request: event.request });
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-runtime-caching
 * @extends module:sw-runtime-caching.Handler
 */
class NetworkFirst extends Handler {
  /**
   * An implementation of a [network first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache)
   * request strategy.
   *
   * @alias NetworkFirst.handle
   * @param {Object} input An object wrapper for the underlying parameters.
   * @param {FetchEvent} input.event The event that triggered the service
   *        worker's fetch handler.
   * @return {Promise.<Response>} The response from the network, or if that's
   *          not available, a previously cached response.
   */
  handle({ event } = {}) {
    var _this = this;

    return asyncToGenerator(function* () {
      assert.isInstance({ event }, FetchEvent);

      let response;
      try {
        response = yield _this.requestWrapper.fetchAndCache({
          request: event.request
        });
        if (response) {
          return response;
        }
      } catch (error) {
        // no-op
      }

      return yield _this.requestWrapper.match({ request: event.request });
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-runtime-caching
 * @extends module:sw-runtime-caching.Handler
 */
class NetworkOnly extends Handler {
  /**
   * An implementation of a [network-only](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-only)
   * request strategy.
   *
   * The advantage to using this vs. directly calling `fetch()` is that it will
   * trigger the behaviors defined in the underlying `RequestWrapper`.
   *
   * @alias NetworkOnly.handle
   * @param {Object} input An object wrapper for the underlying parameters.
   * @param {FetchEvent} input.event The event that triggered the service
   *        worker's fetch handler.
   * @return {Promise.<Response>} The response from the network.
   */
  handle({ event } = {}) {
    var _this = this;

    return asyncToGenerator(function* () {
      assert.isInstance({ event }, FetchEvent);

      return yield _this.requestWrapper.fetch({ request: event.request });
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * @memberof module:sw-runtime-caching
 * @extends module:sw-runtime-caching.Handler
 */
class StaleWhileRevalidate extends Handler {
  /**
   * An implementation of a [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
   * request strategy.
   *
   * In addition to updating the appropriate caches, if will also trigger any
   * appropriate behaviors defined in the underlying `RequestWrapper`.
   *
   * @alias StaleWhileRevalidate.handle
   * @param {Object} input An object wrapper for the underlying parameters.
   * @param {FetchEvent} input.event The event that triggered the service
   *        worker's fetch handler.
   * @return {Promise.<Response>} The response from the cache, if present, or
   *          from the network if not.
   */
  handle({ event } = {}) {
    var _this = this;

    return asyncToGenerator(function* () {
      assert.isInstance({ event }, FetchEvent);

      const fetchAndCacheResponse = _this.requestWrapper.fetchAndCache({
        request: event.request
      }).catch(function () {
        return Response.error();
      });
      const cachedResponse = yield _this.requestWrapper.match({
        request: event.request
      });

      return cachedResponse || (yield fetchAndCacheResponse);
    })();
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * sw-runtime-caching Module
 *
 * @module sw-runtime-caching
 */

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env browser, serviceworker */

/**
 * This is a high level library to help with using service worker
 * precaching and run time caching.
 *
 * @memberof module:sw-lib
 */
class SWLib {
  /**
   * Initialises an instance of SWLib. An instance of this class is
   * accessible when the module is imported into a service worker as
   * `self.goog.swlib`.
   */
  constructor() {
    this._router = new RouterWrapper();
    this._precacheManager = new PrecacheManager();
  }

  /**
   * Revisioned assets can be cached intelligently
   * during the install (i.e. old files are cleared from the cache, new files
   * are added to the cache and unchanged files are left as is).
   *
   * @example
   * self.goog.swlib.cacheRevisionedAssets([
   *     '/styles/main.1234.css',
   *     {
   *       url: '/index.html',
   *       revision: '1234'
   *     }
   * ]);
   *
   * @param {Array<String|Object>} revisionedFiles A set of urls to cache
   * when the service worker is installed.
   */
  cacheRevisionedAssets(revisionedFiles) {
    // Add a more helpful error message than assertion error.
    if (!Array.isArray(revisionedFiles)) {
      throw ErrorFactory.createError('bad-revisioned-cache-list');
    }

    this._precacheManager.cacheRevisioned({
      revisionedFiles
    });
  }

  /**
   * Any assets you wish to cache ahead of time which can't be revisioned
   * should be cached with this method. All assets are cached on install
   * regardless of whether an older version of the request is in the cache.
   *
   * @example
   * self.goog.swlib.warmRuntimeCache([
   *     '/scripts/main.js',
   *     new Request('/images/logo.png')
   * ]);
   *
   * @param {Array<String|Request>} unrevisionedFiles A set of urls to cache
   * when the service worker is installed.
   */
  warmRuntimeCache(unrevisionedFiles) {
    // Add a more helpful error message than assertion error.
    if (!Array.isArray(unrevisionedFiles)) {
      throw ErrorFactory.createError('bad-revisioned-cache-list');
    }

    this._precacheManager.cacheUnrevisioned({
      unrevisionedFiles
    });
  }

  /**
   * A getter for the Router Wrapper.
   * @return {RouterWrapper} Returns the Router Wrapper
   */
  get router() {
    return this._router;
  }

  /**
   * A cache first run-time caching strategy.
   * @param {Object} options Options object that can be used to define
   * arguments on the caching strategy.
   * @return {CacheFirst} The caching handler instance.
   */
  cacheFirst(options) {
    return this._getCachingMechanism(CacheFirst, options);
  }

  /**
   * A cache only run-time caching strategy.
   * @param {Object} options Options object that can be used to define
   * arguments on the caching strategy.
   * @return {CacheFirst} The caching handler instance.
   */
  cacheOnly(options) {
    return this._getCachingMechanism(CacheOnly, options);
  }

  /**
   * A network first run-time caching strategy.
   * @param {Object} options Options object that can be used to define
   * arguments on the caching strategy.
   * @return {CacheFirst} The caching handler instance.
   */
  networkFirst(options) {
    return this._getCachingMechanism(NetworkFirst, options);
  }

  /**
   * A network only run-time caching strategy.
   * @param {Object} options Options object that can be used to define
   * arguments on the caching strategy.
   * @return {CacheFirst} The caching handler instance.
   */
  networkOnly(options) {
    return this._getCachingMechanism(NetworkOnly, options);
  }

  /**
   * A stale while revalidate run-time caching strategy.
   * @param {Object} options Options object that can be used to define
   * arguments on the caching strategy.
   * @return {CacheFirst} The caching handler instance.
   */
  staleWhileRevalidate(options) {
    return this._getCachingMechanism(StaleWhileRevalidate, options);
  }

  /**
   * @private
   * @param {Class} HandlerClass The class to be configured and instantiated.
   * @param {Object} options Options to configure the handler.
   * @return {Handler} A handler instance configured with the appropriate
   * behaviours
   */
  _getCachingMechanism(HandlerClass, options = {}) {
    const behaviorParamsToClass = {
      'cacheExpiration': Behavior,
      'broadcastCacheUpdate': Behavior$1
    };

    const wrapperOptions = {
      behaviors: []
    };

    if (options['cacheName']) {
      wrapperOptions['cacheName'] = options['cacheName'];
    }

    // Iterate over known behaviors and add them to Request Wrapper options.
    const behaviorKeys = Object.keys(behaviorParamsToClass);
    behaviorKeys.forEach(behaviorKey => {
      if (options[behaviorKey]) {
        const BehaviorClass = behaviorParamsToClass[behaviorKey];
        const behaviorParams = options[behaviorKey];

        wrapperOptions.behaviors.push(new BehaviorClass(behaviorParams));
      }
    });

    // Add custom behaviors.
    if (options.behaviors) {
      options.behaviors.forEach(behavior => {
        wrapperOptions.behaviors.push(behavior);
      });
    }

    return new HandlerClass({
      requestWrapper: new RequestWrapper(wrapperOptions)
    });
  }
}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env browser */
/* eslint-disable no-console */

if (!assert.isSWEnv()) {
  // We are not running in a service worker, print error message
  throw ErrorFactory.createError('not-in-sw');
}

/**
 * The sw-lib module is a high-level library that makes it easier to
 * configure routes with caching strategies as well as manage precaching
 * of assets during the install step of a service worker.
 *
 * @example
 * importScripts('/<Path to Module>/build/sw-lib.min.js');
 *
 * // cacheRevisionedAssets() can take an array of strings with
 * // the revision details in the url.
 * goog.swlib.cacheRevisionedAssets([
 *     '/styles/main.1234.css',
 *     '/images/logo.abcd.jpg'
 * ]);
 *
 * // Or it can accept objects with the URL and revision data
 * // kept seperate.
 * goog.swlib.cacheRevisionedAssets([
 *     {
 *       url: '/index.html',
 *       revision: '1234'
 *     },
 *     {
 *       url: '/about.html',
 *       revision: 'abcd'
 *     }
 * ]);
 *
 * // If you have assets that aren't revisioned, you can cache them
 * // during the installation of you service worker using warmRuntimeCache()
 * goog.swlib.warmRuntimeCache([
 *     '/scripts/main.js',
 *     '/images/default-avater.png'
 * ]);
 *
 * // warmRuntimeCache can also accept Requests, in case you need greater
 * // control over the request.
 * goog.swlib.warmRuntimeCache([
 *     new Request('/images/logo.png'),
 *     new Request('/api/data.json')
 * ]);
 *
 * goog.swlib.router.registerRoute('/', goog.swlib.cacheFirst);
 * goog.swlib.router.registerRoute('/example/', goog.swlib.networkFirst);
 *
 * @module sw-lib
 */

const swLibInstance = new SWLib();
swLibInstance.Route = Route;

return swLibInstance;

})));

//# sourceMappingURL=sw-lib.js.map
