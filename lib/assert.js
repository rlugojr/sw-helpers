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

/* eslint-disable require-jsdoc */

import ErrorStackParser from 'error-stack-parser';

function atLeastOne(object) {
  const parameters = Object.keys(object);
  if (!parameters.some((parameter) => object[parameter] !== undefined)) {
    throwError('Please set at least one of the following parameters: ' +
      parameters.map((p) => `'${p}'`).join(', '));
  }
}

function hasMethod(object, expectedMethod) {
  const parameter = Object.keys(object).pop();
  const type = typeof object[parameter][expectedMethod];
  if (type !== 'function') {
    throwError(`The '${parameter}' parameter must be an object that exposes a
      '${expectedMethod}' method.`);
  }
}

function isInstance(object, expectedClass) {
  const parameter = Object.keys(object).pop();
  if (!(object[parameter] instanceof expectedClass)) {
    throwError(`The '${parameter}' parameter must be an instance of
      '${expectedClass.name}'`);
  }
}

function isOneOf(object, values) {
  const parameter = Object.keys(object).pop();
  if (!values.includes(object[parameter])) {
    throwError(`The '${parameter}' parameter must be set to one of the
      following: ${values}`);
  }
}

function isType(object, expectedType) {
  const parameter = Object.keys(object).pop();
  const actualType = typeof object[parameter];
  if (actualType !== expectedType) {
    throwError(`The '${parameter}' parameter has the wrong type. (Expected:
      ${expectedType}, actual: ${actualType})`);
  }
}

function isSWEnv() {
  return ('ServiceWorkerGlobalScope' in self &&
    self instanceof ServiceWorkerGlobalScope);
}

function isValue(object, expectedValue) {
  const parameter = Object.keys(object).pop();
  const actualValue = object[parameter];
  if (actualValue !== expectedValue) {
    throwError(`The '${parameter}' parameter has the wrong value. (Expected: 
      ${expectedValue}, actual: ${actualValue})`);
  }
}

function throwError(message) {
  const error = new Error(message);
  const stackFrames = ErrorStackParser.parse(error);

  // If, for some reason, we don't have all the stack information we need,
  // we'll just end up throwing a basic Error.
  if (stackFrames.length >= 3) {
    // Assuming we have the stack frames, set the message to include info
    // about what the underlying method was, and set the name to reflect
    // the assertion type that failed.
    error.message = `Invalid call to ${stackFrames[2].functionName}() — ` +
      message.replace(/\s+/g, ' ');
    error.name = stackFrames[1].functionName.replace(/^Object\./, '');
  }

  throw error;
}

export default {
  atLeastOne,
  hasMethod,
  isInstance,
  isOneOf,
  isType,
  isSWEnv,
  isValue,
};
