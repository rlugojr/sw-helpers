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
  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;

  // Precache files
  global.toolbox.precache(['/demo/index.html', '../bootstrap/sw-toolbox-setup.js', '../bootstrap/simple-db.js', '../bootstrap/offline-analytics.js']);
  
  global.toolbox.router.get('/(.*)', global.toolbox.fastest);
})(self);
