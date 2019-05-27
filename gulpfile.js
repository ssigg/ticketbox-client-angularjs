var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var zip = require('gulp-zip');

var bases = {
    customer: 'dist/customer/',
    boxoffice: 'dist/boxoffice/',
    admin: 'dist/admin/',
    root: 'dist/'
};

var paths = {
    icons: [
        'app/icon-*.png'
    ],
    stylesheets: [
        'app/bower_components/skeleton-css/css/normalize.css',
        'app/bower_components/skeleton-css/css/skeleton.css',
        'app/loading.css',
        'app/app.css'
    ],
    scripts: [
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-translate/angular-translate.js',
        'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'app/bower_components/ocanvas/index.js',
        'app/bower_components/underscore/underscore.js',
        'app/bower_components/angular-image-upload-datauri/src/imageupload.js',
        'app/components/*/*.js',
        '!app/components/*/*_test.js',
        '!app/*.config/*.js'
    ],
    templates: [
        'app/components/*/*.html'
    ],
    customer: {
        page: [
            'app/customer.html'
        ],
        config: [
            'app/customer.config/*_sample.js'
        ],
        stylesheets: [
            'app/common.app.css'
        ],
        scripts: [
            'app/bower_components/braintree-web/dist/braintree.js',
            'app/common.*/*.js',
            '!app/common.*/*_test.js',
            'app/customer.app.js',
            'app/customer.*/*.js',
            '!app/customer.*/*_test.js' 
        ],
        locales: [
            'app/customer.locales/*.json'
        ],
        templates: [
            'app/common.*/*.html',
            'app/customer.*/*.html'
        ]
    },
    boxoffice: {
        page: [
            'app/boxoffice.html'
        ],
        config: [
            'app/boxoffice.config/*_sample.js'
        ],
        stylesheets: [
            'app/common.app.css'
        ],
        scripts: [
            'app/common.*/*.js',
            '!app/common.*/*_test.js',
            'app/boxoffice.app.js',
            'app/boxoffice.*/*.js',
            '!app/boxoffice.*/*_test.js' 
        ],
        locales: [
            'app/boxoffice.locales/*.json'
        ],
        templates: [
            'app/common.*/*.html',
            'app/boxoffice.*/*.html'
        ]
    },
    admin: {
        icons: [
            'app/admin-icon-*.png'
        ],
        page: [
            'app/admin.html'
        ],
        config: [
            'app/admin.config/*_sample.js'
        ],
        stylesheets: [
            'app/admin.app.css'
        ],
        scripts: [
            'app/admin.app.js',
            'app/admin.*/*.js',
            '!app/admin.*/*_test.js' 
        ],
        locales: [
            'app/admin.locales/*.json'
        ],
        templates: [
            'app/admin.*/*.html'
        ]
    }
};

gulp.task('clean', function() {
    return gulp.src(bases.root)
        .pipe(clean());
});

gulp.task('customer-icons', [ 'clean' ], function() {
    return gulp.src(paths.icons)
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-config', [ 'clean' ], function() {
    return gulp.src(paths.customer.config)
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-locales', [ 'clean' ], function() {
    return gulp.src(paths.customer.locales, { base: './app/' })
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-scripts', [ 'clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.customer.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-stylesheets', [ 'clean' ], function() {
    return gulp.src(paths.stylesheets.concat(paths.customer.stylesheets))
        .pipe(cleanCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-templates', [ 'clean' ], function() {
    return gulp.src(paths.templates.concat(paths.customer.templates), { base: './app/' })
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-page', [ 'clean' ], function() {
    return gulp.src(paths.customer.page)
        .pipe(replace(/<!-- stylesheets -->([\w\W\s]*)<!-- \/stylesheets -->/, '<link rel="stylesheet" href="app.min.css">'))
        .pipe(replace(/<!-- scripts -->([\w\W\s]*)<!-- \/scripts -->/, '<script src="app.min.js"></script>\n<script src="config.js"></script>'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer', [ 'customer-config', 'customer-icons', 'customer-locales', 'customer-scripts', 'customer-stylesheets', 'customer-templates', 'customer-page' ]);

gulp.task('boxoffice-icons', [ 'clean' ], function() {
    return gulp.src(paths.icons)
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-config', [ 'clean' ], function() {
    return gulp.src(paths.boxoffice.config)
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-locales', [ 'clean' ], function() {
    return gulp.src(paths.boxoffice.locales, { base: './app/' })
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-scripts', [ 'clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.boxoffice.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-stylesheets', [ 'clean' ], function() {
    return gulp.src(paths.stylesheets.concat(paths.boxoffice.stylesheets))
        .pipe(cleanCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-templates', [ 'clean' ], function() {
    return gulp.src(paths.templates.concat(paths.boxoffice.templates), { base: './app/' })
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-page', [ 'clean' ], function() {
    return gulp.src(paths.boxoffice.page)
        .pipe(replace(/<!-- stylesheets -->([\w\W\s]*)<!-- \/stylesheets -->/, '<link rel="stylesheet" href="app.min.css">'))
        .pipe(replace(/<!-- scripts -->([\w\W\s]*)<!-- \/scripts -->/, '<script src="app.min.js"></script>\n<script src="config.js"></script>'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice', [ 'boxoffice-config', 'boxoffice-icons', 'boxoffice-locales', 'boxoffice-scripts', 'boxoffice-stylesheets', 'boxoffice-templates', 'boxoffice-page' ]);

gulp.task('admin-icons', [ 'clean' ], function() {
    return gulp.src(paths.admin.icons)
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-config', [ 'clean' ], function() {
    return gulp.src(paths.admin.config)
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-locales', [ 'clean' ], function() {
    return gulp.src(paths.admin.locales, { base: './app/' })
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-scripts', [ 'clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.admin.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-stylesheets', [ 'clean' ], function() {
    return gulp.src(paths.stylesheets.concat(paths.admin.stylesheets))
        .pipe(cleanCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-templates', [ 'clean' ], function() {
    return gulp.src(paths.templates.concat(paths.admin.templates), { base: './app/' })
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-page', [ 'clean' ], function() {
    return gulp.src(paths.admin.page)
        .pipe(replace(/<!-- stylesheets -->([\w\W\s]*)<!-- \/stylesheets -->/, '<link rel="stylesheet" href="app.min.css">'))
        .pipe(replace(/<!-- scripts -->([\w\W\s]*)<!-- \/scripts -->/, '<script src="app.min.js"></script>\n<script src="config.js"></script>'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin', [ 'admin-config', 'admin-icons', 'admin-scripts', 'admin-locales', 'admin-stylesheets', 'admin-templates', 'admin-page' ]);

gulp.task('zip', [ 'customer', 'boxoffice', 'admin' ], function() {
    return gulp.src(bases.root + '**')
        .pipe(zip('ticketbox-client-angularjs.zip'))
        .pipe(gulp.dest(bases.root));
});