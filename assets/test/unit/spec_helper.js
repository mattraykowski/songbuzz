var Contextify = require('contextify');
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<html><head></head><body></body></html>');
global.window = document.parentWindow;

require('../../public/javascripts/lib/jquery/jquery.min.js');
require('../../public/javascripts/lib/angular/angular.js');
require('../../public/javascripts/lib/angular/angular-*.js');
require('../../test/lib/angular/angular-mocks.js');
require('../../test/lib/object-mocks.js');
require('../../test/lib/sample-data.js');
require('../../public/javascripts/songbuzzApp.js');
require('../../public/javascripts/services.js');
require('../../public/javascripts/controllers.js');