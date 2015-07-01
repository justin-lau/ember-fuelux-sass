/* jshint node: true */
'use strict';

var _           = require('lodash-node');
var path        = require('path');
var addonConfig = null;

module.exports = {
  name: 'ember-fuelux-sass',

  /**
   * Compile `addon/styles/fuelux.scss`.
   */
  setupPreprocessorRegistry: function(type, registry) {
    if (type === 'self') {
      registry.add('css', {
        name: 'ember-fuelux-sass',
        toTree: function(tree, inputPath, outputPath, options) {
          // If `excludeStyle` is turned on, the fuelux css will never be imported.
          // Otherwise, the css will be included in `vendor.css` unless `useCDN`
          // is turned on and the addon is building in production mode.
          if (!addonConfig.excludeStyle && !(addonConfig.useCDNForStyle && process.env.EMBER_ENV === 'production')) {
            // tell `ember-cli-sass` to compile `addon/styles/fuelux.scss`
            options.outputPaths.fuelux = 'fuelux.css';

            // minimum required by bootstrap
            if (!options.precision || options.precision < 8) {
              options.precision = 8;
            }
          }

          return tree;
        }
      });
    }
  },

  /**
   * Setup config defaults. Import Bootstrap's javascripts and font files.
   */
  included: function(app) {
    this._super.included(app);

    var config = addonConfig = _.defaults(app.options.fuelux || {}, {
      excludeStyle: false,
      excludeScripts: false,
      useCDNForStyle: false,
      useCDNForScripts: false,
    });

    // If `excludeScripts` is turned on, the script will never be imported.
    // Otherwise, the script will be included in `vendor.js` unless `useCDN`
    // is turned on and the addon is building in production mode.
    if (!config.excludeScripts && !(config.useCDNForScripts && process.env.EMBER_ENV === 'production')) {
      app.import(app.bowerDirectory + '/fuelux-sass/assets/javascripts/fuelux.js');
    }

    // Import fonts if styles are needed.
    if (!config.excludeStyle && !(config.useCDNForStyle && process.env.EMBER_ENV === 'production')) {
      var fontFilePath = path.join(app.bowerDirectory, '/fuelux-sass/assets/fonts/fuelux');
      var extensions = ['.eot', '.svg', '.ttf', '.woff'];

      _.forEach(extensions, function(extension) {
        app.import(fontFilePath + extension, { destDir: 'assets/fonts' });
      });
    }
  },

  /**
   * Inject CDN resources tags.
   */
  contentFor: function(type, config) {
    // fuelux-sass does not have a stable release yet, and there is not yet a
    // way to find a valid fuelux version through fuelux-sass's repository.

    // var fueluxBowerFilePath = path.join(
    //     this.project.root,
    //     this.app.bowerDirectory,
    //     '/fuelux/.bower.json'
    //   );
    //
    // var fueluxVersion = require(fueluxBowerFilePath).version;

    var fueluxVersion = '3.9.0';

    if (process.env.EMBER_ENV === 'production') {
      var styleContentType = addonConfig.useCDNForStyle === true ? 'head' : addonConfig.useCDNForStyle;
      var scriptsContentType = addonConfig.useCDNForScripts === true ? 'body-footer' : addonConfig.useCDNForScripts;

      if (type === styleContentType) {
        return '<link rel="stylesheet" href="//www.fuelcdn.com/fuelux/' + fueluxVersion + '/css/fuelux.min.css">';
      }

      if (type === scriptsContentType) {
        return '<script src="//www.fuelcdn.com/fuelux/' + fueluxVersion + '/js/fuelux.min.js"></script>';
      }
    }
  },

};
