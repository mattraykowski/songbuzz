basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,

    // SailsJS
    'assets/js/socket.io.js',
    'assets/js/sails.io.js',
    'assets/js/app.js',

    // Third Party Components
    'assets/components/jquery/jquery.js',
    'assets/components/bootstrap/dist/js/bootstrap.js',
    'assets/components/jquery-ui/ui/jquery-ui.js',
    'assets/components/select2/select2.js',
    'assets/components/lodash/lodash.js',

    // Angular-related Components
    'assets/components/angular/angular.js',
    'assets/components/angular-route/angular-route.js',
    'assets/components/angular-ui-sortable/src/sortable.js',
    'assets/components/angular-ui-select2/src/select2.js',
    'assets/components/restangular/dist/restangular.js',

    // Angular-related Testing Components
    'assets/components/angular-mocks/angular-mocks.js',

    // Sample data and mocks.
    'assets/test/lib/object-mocks.js',
    'assets/test/lib/sample-data.js',

    // Frontend Angular Code
    'assets/js/songbuzzApp.js',
    'assets/js/services/*.js',
    'assets/js/directives/*.js',
    'assets/js/controllers/*.js',

    // Actual Unit Tests
    'assets/test/unit/**/*.js'
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

