if (!Object.prototype.assign) {
  var assign = function (target) {
    'use strict';
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  };
  Object.defineProperty(Object.prototype, 'assign', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: assign,
  });
}