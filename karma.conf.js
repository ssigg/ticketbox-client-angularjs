module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/underscore/underscore.js',
            'app/bower_components/ocanvas/index.js',
            'app/config/config_sample.js',
            'app/components/*/*.js',
            'app/*/*.js'
        ],

        preprocessors: {
            'app/{*/!(*_test).js,components/*/!(*_test).js}': [ 'coverage' ]
        },

        reporters: [ 'progress', 'coverage' ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'coverage'
        }
    });
};
