// Dependencies
var babelTemplate = require('babel-template');

// Public
module.exports = function () {
  return {
    visitor: {
      Program: {
        exit: function (path) {
          if (path.BABEL_PLUGIN_ADD_RETURN_EXPORTS) {
            return;
          }

          path.pushContainer('body', [babelTemplate("if (typeof exports === 'object' && exports && exports.__esModule) return exports;")()]);

          path.BABEL_PLUGIN_ADD_RETURN_EXPORTS = true;
        }
      }
    }
  };
};
