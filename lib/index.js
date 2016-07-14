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

          var hasExport = path.get('body').some(function(path) {
            return path.isExportDeclaration();
          });

          if (hasExport) {
            path.pushContainer('body', [babelTemplate("return exports;")()]);
          }

          path.BABEL_PLUGIN_ADD_RETURN_EXPORTS = true;
        }
      }
    }
  }
}
