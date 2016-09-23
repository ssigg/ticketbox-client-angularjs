var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var bases = {
    customer: 'dist/customer/',
    boxoffice: 'dist/boxoffice/'
};

var paths = {
    stylesheets: [
        'app/bower_components/skeleton-css/css/normalize.css',
        'app/bower_components/skeleton-css/css/skeleton.css',
        'app/app.css'
    ],
    scripts: [
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/ocanvas/index.js',
        'app/bower_components/underscore/underscore.js',
        'app/components/*/*.js',
        '!app/components/*/*_test.js',
        'app/common.*/*.js',
        '!app/common.*/*_test.js',
        '!app/config/*.js'
    ],
    templates: [
        'app/components/*/*.html',
        'app/common.*/*.html'
    ],
    customer: {
        page: [
            'app/customer.html'
        ],
        config: [
            'app/customer.config/*.js'
        ],
        scripts: [
            'app/customer.app.js',
            'app/customer.*/*.js',
            '!app/customer.*/*_test.js' 
        ],
        templates: [
            'app/customer.*/*.html'
        ]
    },
    boxoffice: {
        page: [
            'app/boxoffice.html'
        ],
        config: [
            'app/boxoffice.config/*.js'
        ],
        scripts: [
            'app/boxoffice.app.js',
            'app/boxoffice.*/*.js',
            '!app/boxoffice.*/*_test.js' 
        ],
        templates: [
            'app/boxoffice.*/*.html'
        ]
    }
};

gulp.task('customer-clean', function() {
    return gulp.src(bases.customer)
        .pipe(clean());
});

gulp.task('customer-config', [ 'customer-clean' ], function() {
    return gulp.src(paths.customer.config)
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-scripts', [ 'customer-clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.customer.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-stylesheets', [ 'customer-clean' ], function() {
    return gulp.src(paths.stylesheets)
        .pipe(cleanCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-templates', [ 'customer-clean' ], function() {
    return gulp.src(paths.templates.concat(paths.customer.templates), { base: './app/' })
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-page', [ 'customer-clean' ], function() {
    return gulp.src(paths.customer.page)
        .pipe(replace(/<!-- stylesheets -->([\w\W\s]*)<!-- \/stylesheets -->/, '<link rel="stylesheet" href="app.min.css">'))
        .pipe(replace(/<!-- scripts -->([\w\W\s]*)<!-- \/scripts -->/, '<script src="app.min.js"></script>\n<script src="config.js"></script>'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer', [ 'customer-config', 'customer-scripts', 'customer-stylesheets', 'customer-templates', 'customer-page' ]);

gulp.task('boxoffice-clean', function() {
    return gulp.src(bases.boxoffice)
        .pipe(clean());
});

gulp.task('boxoffice-config', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.boxoffice.config)
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-scripts', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.boxoffice.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-stylesheets', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.stylesheets)
        .pipe(cleanCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-templates', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.templates.concat(paths.boxoffice.templates), { base: './app/' })
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-page', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.boxoffice.page)
        .pipe(replace(/<!-- stylesheets -->([\w\W\s]*)<!-- \/stylesheets -->/, '<link rel="stylesheet" href="app.min.css">'))
        .pipe(replace(/<!-- scripts -->([\w\W\s]*)<!-- \/scripts -->/, '<script src="app.min.js"></script>\n<script src="config.js"></script>'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice', [ 'boxoffice-config', 'boxoffice-scripts', 'boxoffice-stylesheets', 'boxoffice-templates', 'boxoffice-page' ]);