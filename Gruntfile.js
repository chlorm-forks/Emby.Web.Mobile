var packageJson = require('./package.json');
var path = require('path');

module.exports = function (grunt) {

    grunt.file.defaultEncoding = 'utf8';
    grunt.file.preserveBOM = true;

    // Unfortunately i'm having trouble getting the ie and ie_mob exclusions to work
    // So instead we're opting into everything else: https://github.com/ai/browserslist
    var autoPrefixBrowsers = [

        'Chrome',
        'Firefox',
        'Edge',
        'iOS',
        'Opera',
        'Safari',
        'Android',
        'BlackBerry',
        'ChromeAndroid',
        'FirefoxAndroid',
        'OperaMobile',
        'OperaMini',
        'Samsung'

    ].map(function (b) {
        return 'last 20 ' + b + ' versions';
    });

    grunt.initConfig({
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                strict: true,
                validthis: true,
                multistr: true,
                globals: {
                }
            },
            uses_defaults: [
                'src/**/*.js',
                '!src/**/*min.js',
                '!src/bower_components/cryptojslib/**/*.js',
                '!src/bower_components/document-register-element/**/*.js',
                '!src/bower_components/fetch/**/*.js',
                '!src/bower_components/hammerjs/**/*.js',
                '!src/bower_components/native-promise-only/**/*.js',
                '!src/bower_components/query-string/**/*.js',
                '!src/bower_components/Sortable/**/*.js',
                '!src/bower_components/Swiper/**/*.js',
                '!src/bower_components/emby-webcomponents/polyfills/**/*.js',
                '!src/bower_components/emby-webcomponents/sharing/social-share-kit-1.0.10/**/*.js',
                '!src/bower_components/emby-webcomponents/native-promise-only/**/*.js',
                '!src/environments/webos/webos.js',
                '!src/environments/windows-uwp/mediacontrol.js'
            ]
        },
		clean: ['dist/'],
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**',

                        // exclude by extension
                        '!bower_components/**/*.log',
                        '!bower_components/**/*.txt',
                        '!bower_components/**/*.map',
                        '!bower_components/**/*.md',
                        '!bower_components/**/*.gz',
                        '!bower_components/**/*.bat',
                        '!bower_components/**/*.sh',

                        // exclude by name
                        '!bower_components/**/gitignore',
                        '!bower_components/**/npmignore',
                        '!bower_components/**/jshintrc',
                        '!bower_components/**/gruntfile',
                        '!bower_components/**/Gruntfile.js',
                        '!bower_components/**/bowerrc',
                        '!bower_components/**/jscsrc',
                        '!bower_components/**/hero.svg',
                        '!bower_components/**/travis.yml',
                        '!bower_components/**/build.js',
                        '!bower_components/**/bower.json',
                        '!bower_components/**/component.json',
                        '!bower_components/**/package.json',
                        '!bower_components/**/composer.json',
                        '!bower_components/**/editorconfig',
                        '!bower_components/**/gitattributes',

                        '!bower_components/hlsjs/src/**/*',
                        '!bower_components/query-string/test/**/*',
                        '!bower_components/jquery/external/**/*',
                        '!bower_components/jquery/src/**/*',
                        '!bower_components/jstree/src/**/*',


                        '!bower_components/cryptojslib/components/**/*',
                        'bower_components/cryptojslib/components/**/core-min.js',
                        'bower_components/cryptojslib/components/**/md5-min.js',
                        'bower_components/cryptojslib/components/**/sha1-min.js'
                    ],
                    dest: 'dist/'
                }]
            }
        },
        autoprefixer: {
            options: {
                cascade: false,
                browsers: autoPrefixBrowsers
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.css', '!**/*min.css'],
                    dest: 'dist/'
                }]
            },
        },
        uglify: {
            options: {
                mangle: false,
                preserveComments: false
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '!**/*min.js'],
                    dest: 'dist/'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.css', '!**/*min.css'],
                    dest: 'dist/'
                }]
            }
        },
        charset: {
            main: {
                options: {
                    from: 'UTF-8',
                    to: 'UTF-8',
                    addBOM: true,
                    stripBOM: false
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    dest: 'dist/',
                    src: ['**/*.{html,css,js}']
                }]
            }
        },
        swPrecache: {
            main: {
                handleFetch: true,
                rootDir: 'dist'
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-charset');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');

    //Some customizations have been added to grunt-charset:

    // Update decode method to pass options object with stripBOM: false
    // Update encode method to pass options object with addBOM: true    grunt.loadNpmTasks('grunt-charset');

    function writeServiceWorkerFile(rootDir, handleFetch, callback) {

        var ignoreUrlParametersMatching = [];
        ignoreUrlParametersMatching.push(/^v/);

        var config = {
            cacheId: packageJson.name,
            dynamicUrlToDependencies: {
            },
            // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
            // the service worker will precache resources but won't actually serve them.
            // This allows you to test precaching behavior without worry about the cache preventing your
            // local changes from being picked up during the development cycle.
            handleFetch: handleFetch,
            logger: grunt.log.writeln,
            staticFileGlobs: [
              rootDir + '/**'
            ],
            stripPrefix: rootDir + '/',
            // verbose defaults to false, but for the purposes of this demo, log more.
            verbose: true,
            // 2MB
            maximumFileSizeToCacheInBytes: 2097152,
            ignoreUrlParametersMatching: ignoreUrlParametersMatching,
            importScripts: ['bower_components/emby-webcomponents/serviceworker/notifications.js', 'bower_components/emby-webcomponents/serviceworker/sync.js']
        };

        var swPrecache = require('sw-precache');
        swPrecache.write(path.join(rootDir, 'serviceworker.js'), config, callback);
    }

    grunt.registerMultiTask('swPrecache', function () {
        var done = this.async();
        var rootDir = this.data.rootDir;
        var handleFetch = this.data.handleFetch;

        writeServiceWorkerFile(rootDir, handleFetch, function (error) {
            if (error) {
                grunt.fail.warn(error);
            }
            done();
        });
    });

    function registerTask(name, exclusions) {

        var gruntTasks = [];
        //gruntTasks.push('jshint');
        gruntTasks.push('clean');
        gruntTasks.push('copy');
        gruntTasks.push('autoprefixer');
        gruntTasks.push('uglify');
        gruntTasks.push('cssmin');
        gruntTasks.push('swPrecache');
        gruntTasks.push('charset');

        gruntTasks = gruntTasks.filter(function (t) {
            return exclusions.indexOf(t) === -1;
        });

        grunt.registerTask(name, gruntTasks);
    }

    registerTask('default', ['charset']);
    registerTask('server', ['swPrecache', 'charset']);
};