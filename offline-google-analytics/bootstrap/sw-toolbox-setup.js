/*!
 *
 *  Copyright 2016 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

(function(global) {
  // var swToolboxURL = new URL('bower_components/sw-toolbox/sw-toolbox.js', global.params.get('baseURI')).href;
  // importScripts(swToolboxURL);

  var cacheId = global.params.get('cacheId');
  if (cacheId) {
    global.toolbox.options.cacheName = cacheId + '$$$' + global.registration.scope;
  }
  
  if (global.params.has('defaultCacheStrategy')) {
    var strategy = global.params.get('defaultCacheStrategy');
    global.toolbox.router.default = global.toolbox[strategy] || global[strategy];
  }

  var precachePromise;
  // When precacheFingerprint is present inside the cacheConfigFile JSON, its a signal that instead
  // of reading the list of URLs to precache from the service worker's URL parameters, we need to
  // instead fetch the JSON file and read the list of precache URLs for there. This works around
  // the problem that the list of URLs to precache might be longer than the browser-specific limit
  // on the size of a service worker's URL.
  if (global.params.has('precacheFingerprint') && global.params.has('cacheConfigFile')) {
    precachePromise = global.fetch(global.params.get('cacheConfigFile')).then(function(response) {
      return response.json();
    }).then(function(json) {
      return json.precache || [];
    }).catch(function(error) {
      return [];
    }).then(function(precache) {
      return precache.concat(global.params.get('precache'));
    })
  } else {
    precachePromise = Promise.resolve(global.params.get('precache') || []);
  }

  global.toolbox.precache(precachePromise);

  if (global.params.has('route')) {
    var setsOfRouteParams = global.params.get('route');
    while (setsOfRouteParams.length > 0) {
      var routeParams = setsOfRouteParams.splice(0, 3);
      var originParam;
      if (routeParams[2]) {
        originParam = {origin: new RegExp(routeParams[2])};
      }
      var handler = global.toolbox[routeParams[1]] || global[routeParams[1]];
      if (typeof handler === 'function') {
        global.toolbox.router.get(routeParams[0], handler, originParam);
      } else {
        console.error('Unable to register sw-toolbox route: ', routeParams);
      }
    }
  }
})(self);
