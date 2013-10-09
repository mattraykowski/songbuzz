basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'public/javascripts/lib/jquery/jquery.min.js',
  'public/javascripts/lib/angular/angular.js',
  'public/javascripts/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'test/lib/object-mocks.js',
  'test/lib/sample-data.js',
  'public/javascripts/songbuzzApp.js',
  'public/javascripts/services.js',
  'public/javascripts/controllers.js',
  'test/unit/**/*.js'
];

autoWatch = true;

host = '127.6.70.1';
port = 8080;

logLevel = LOG_INFO;

browsers = ['PhantomJS'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};

singleRun = true;

