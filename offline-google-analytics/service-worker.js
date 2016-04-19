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
  var VERSION = '1.0';
  
  function deserializeUrlParams(queryString) {
    return new Map(queryString.split('&').map(function(keyValuePair) {
      var splits = keyValuePair.split('=');
      var key = decodeURIComponent(splits[0]);
      var value = decodeURIComponent(splits[1]);
      if (value.indexOf(',') >= 0) {
        value = value.split(',');
      }
  
      return [key, value];
    }));
  }
  
  global.params = deserializeUrlParams(location.search.substring(1));
  
  if (global.params.has('importscript')) {
    var scripts = global.params.get('importscript');
    if (Array.isArray(scripts)) {
      importScripts.apply(null, scripts);
    } else {
      importScripts(scripts);
    }
  }
  
  if (global.params.get('skipWaiting') === 'true' && global.skipWaiting) {
    global.addEventListener('install', function(e) {
      e.waitUntil(global.skipWaiting());
    });
  }
  
  if (global.params.get('clientsClaim') === 'true' && global.clients && global.clients.claim) {
    global.addEventListener('activate', function(e) {
      e.waitUntil(global.clients.claim());
    });
  }
})(self);
