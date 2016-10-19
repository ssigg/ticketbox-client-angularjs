var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var bases = {
    customer: 'dist/customer/',
    boxoffice: 'dist/boxoffice/',
    admin: 'dist/admin/'
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
        'app/components/*/*.js',
        '!app/components/*/*_test.js',
        '!app/*.config/*.js'
    ],
    locales: [
        'app/common.locales/*.json'
    ],
    templates: [
        'app/components/*/*.html'
    ],
    customer: {
        page: [
            'app/customer.html'
        ],
        config: [
            'app/customer.config/*.js'
        ],
        stylesheets: [
            'app/customer.app.css'
        ],
        scripts: [
            'app/common.*/*.js',
            '!app/common.*/*_test.js',
            'app/customer.app.js',
            'app/customer.*/*.js',
            '!app/customer.*/*_test.js' 
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
            'app/boxoffice.config/*.js'
        ],
        stylesheets: [
            'app/boxoffice.app.css'
        ],
        scripts: [
            'app/common.*/*.js',
            '!app/common.*/*_test.js',
            'app/boxoffice.app.js',
            'app/boxoffice.*/*.js',
            '!app/boxoffice.*/*_test.js' 
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
            'app/admin.config/*.js'
        ],
        stylesheets: [
            'app/admin.app.css'
        ],
        scripts: [
            'app/admin.app.js',
            'app/admin.*/*.js',
            '!app/admin.*/*_test.js' 
        ],
        templates: [
            'app/admin.*/*.html'
        ]
    }
};

gulp.task('customer-clean', function() {
    return gulp.src(bases.customer)
        .pipe(clean());
});

gulp.task('customer-icons', [ 'customer-clean' ], function() {
    return gulp.src(paths.icons)
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-config', [ 'customer-clean' ], function() {
    return gulp.src(paths.customer.config)
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-locales', [ 'customer-clean' ], function() {
    return gulp.src(paths.locales, { base: './app/' })
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-scripts', [ 'customer-clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.customer.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.customer));
});

gulp.task('customer-stylesheets', [ 'customer-clean' ], function() {
    return gulp.src(paths.stylesheets.concat(paths.customer.stylesheets))
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

gulp.task('customer', [ 'customer-config', 'customer-icons', 'customer-locales', 'customer-scripts', 'customer-stylesheets', 'customer-templates', 'customer-page' ]);

gulp.task('boxoffice-clean', function() {
    return gulp.src(bases.boxoffice)
        .pipe(clean());
});

gulp.task('boxoffice-icons', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.icons)
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-config', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.boxoffice.config)
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-locales', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.locales, { base: './app/' })
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-scripts', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.boxoffice.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.boxoffice));
});

gulp.task('boxoffice-stylesheets', [ 'boxoffice-clean' ], function() {
    return gulp.src(paths.stylesheets.concat(paths.boxoffice.stylesheets))
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

gulp.task('boxoffice', [ 'boxoffice-config', 'boxoffice-icons', 'boxoffice-locales', 'boxoffice-scripts', 'boxoffice-stylesheets', 'boxoffice-templates', 'boxoffice-page' ]);

gulp.task('admin-clean', function() {
    return gulp.src(bases.admin)
        .pipe(clean());
});

gulp.task('admin-icons', [ 'admin-clean' ], function() {
    return gulp.src(paths.admin.icons)
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-config', [ 'admin-clean' ], function() {
    return gulp.src(paths.admin.config)
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-locales', [ 'admin-clean' ], function() {
    return gulp.src(paths.locales, { base: './app/' })
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-scripts', [ 'admin-clean' ], function() {
    return gulp.src(paths.scripts.concat(paths.admin.scripts))
        .pipe(uglify({ mangle: false }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-stylesheets', [ 'admin-clean' ], function() {
    return gulp.src(paths.stylesheets.concat(paths.admin.stylesheets))
        .pipe(cleanCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-templates', [ 'admin-clean' ], function() {
    return gulp.src(paths.templates.concat(paths.admin.templates), { base: './app/' })
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin-page', [ 'admin-clean' ], function() {
    return gulp.src(paths.admin.page)
        .pipe(replace(/<!-- stylesheets -->([\w\W\s]*)<!-- \/stylesheets -->/, '<link rel="stylesheet" href="app.min.css">'))
        .pipe(replace(/<!-- scripts -->([\w\W\s]*)<!-- \/scripts -->/, '<script src="app.min.js"></script>\n<script src="config.js"></script>'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.admin));
});

gulp.task('admin', [ 'admin-config', 'admin-icons', 'admin-scripts', 'admin-locales', 'admin-stylesheets', 'admin-templates', 'admin-page' ]);