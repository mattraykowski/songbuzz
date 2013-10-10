// Karma configuration
// Generated on Thu Oct 10 2013 09:30:07 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'assets/js/socket.io.js',
      'assets/js/sails.io.js',
      'assets/js/app.js',
      'assets/components/jquery/jquery.js',
      'assets/components/bootstrap/dist/js/bootstrap.js',
      'assets/components/jquery-ui/ui/jquery-ui.js',
      'assets/components/select2/select2.js',
      'assets/components/lodash/lodash.js',
      'assets/components/angular/angular.js',
      'assets/components/angular-route/angular-route.js',
      'assets/components/angular-ui-sortable/src/sortable.js',
      'assets/components/angular-ui-select2/src/select2.js',
      'assets/components/restangular/dist/restangular.js',
      'assets/components/angular-mocks/angular-mocks.js',
      'assets/test/lib/object-mocks.js',
      'assets/test/lib/sample-data.js',
      'assets/js/songbuzzApp.js',
      'assets/js/services/*.js',
      'assets/js/directives/*.js',
      'assets/js/controllers/*.js',
      'assets/test/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
