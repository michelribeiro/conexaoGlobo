'use strict';

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

    // Load tasks
    require('jit-grunt')(grunt, {
        cmq: 'grunt-combine-media-queries'
    });

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp'
    };

    grunt.initConfig({

        config: config,

        // Configure JSHint.
        jshint: {
            options: {
                jshintrc: true
            },
            src: [
                '!<%= config.app %>/scripts/vendor/*.js',
                '<%= config.app %>/scripts/app.js'
            ]
        },

        // Compress JS
        uglify: {
            dev: {
                options: {
                    sourceMap: false,
                    sourceMapIncludeSources: false,
                    beautify: true,
                    mangle: false
                },
                src: [
                    '<%= config.app %>/scripts/app.js'
                ],
                    dest: '<%= config.tmp %>/scripts/apis-angular.js'
            },
            dist: {
                options: {
                    sourceMap: false,
                    sourceMapIncludeSources: false,
                    beautify: true,
                    mangle: false
                },
                src: [
                    '<%= config.app %>/scripts/app.js',
                ],
                    dest: '<%= config.dist %>/scripts/apis-angular.js'
            }
        },

        // Compress the CSS.
        sass: {
            dev: {
                options: {
                    sourcemap: 'auto',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles/',
                    src: ['**/*.scss'],
                    dest: '<%= config.tmp %>/styles/',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded' //expanded or compressed
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles/',
                    src: ['**/*.scss'],
                    dest: '<%= config.dist %>/styles/',
                    ext: '.css'
                }]
            }
        },

        // Auto prefix css
        autoprefixer: {
            dev: {
                options: {
                    map: true,
                    browsers: ['last 2 versions', 'ie 9', '> 1%']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.tmp %>/styles/'
                }]
            },
            dist: {
                options: {
                map: false,
                browsers: ['last 2 versions', 'ie 9', '> 1%']
            },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.dist %>/styles/'
                }]
            }
        },

        // Compress images.
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= config.tmp %>/images/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= config.dist %>/images/'
                }]
            }
        },

        // Jade Files
        jade: {
            options: {
            pretty: true
          },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.tmp %>',
                    src: ['*.jade'],
                    ext: '.html'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: ['*.jade'],
                    ext: '.html'
                }]
            }
        },

        copy: {
            dev: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: '<%= config.app %>/scripts/vendor/*' , dest: '<%= config.tmp %>/scripts/vendor/'
                },
                {
                    expand: true,
                    flatten: true,
                    src: '<%= config.app %>/scripts/apis-angular.js' , dest: '<%= config.tmp %>/scripts/apis-angular.js'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: '<%= config.app %>/scripts/vendor/*' , dest: '<%= config.dist %>/scripts/vendor/'
                },
                {
                    expand: true,
                    flatten: true,
                    src: '<%= config.app %>/scripts/apis-angular.js' , dest: '<%= config.dist %>/scripts/apis-angular.js'
                }]
            },
        },

        // Empties folders to start fresh
        clean: {
          dist: {
            files: [{
              dot: true,
              src: [
                '.sass-cache/*',
                '<%= config.dist %>/*',
                '<%= config.tmp %>/*'
              ]
            }]
          }
        },

        // Delete Empties folders
        cleanempty: {
          options: {},
          src: ['.tmp/', 'dist/']
        },

        // Watch files
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['<%= config.app %>/scripts/**/*.js'],
                tasks: ['jshint', 'uglify:dev']
            },
            sass: {
                files: ['<%= config.app %>/styles/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer:dev']
            },
            images: {
                files: ['<%= config.app %>/images/**/*.{png,jpg,gif,svg}']
            },
            html: {
                files: ['<%= config.app %>/*.jade', '<%= config.app %>/_partials/**/*.jade', '<%= config.app %>/scripts/**/*.jade'],
                tasks: ['jade:dev']
            }
        },

        // Connect
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: './<%= config.tmp %>/',
                    hostname: '*',
                    livereload: true,
                    open: true
                }
            }
        },

        //combine media querie
        cmq: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles/',
                    src: '*.css',
                    dest: '<%= config.dist %>/styles/'
                }]
            }
        }
    });

    // Task Development
    grunt.registerTask('default', [
        //'clean',
        //'cleanempty',
        'sass:dev',
        'autoprefixer:dev',
        'copy:dev',
        //'imagemin:dev',
        'uglify:dev',
        'jade:dev',
        'connect',
        'watch'
    ]);

    // Task Build
    grunt.registerTask('build', [
        'cmq',
        'sass:dist',
        //'clean',
        //'cleanempty',
        'autoprefixer:dist',
        'copy:dist',
        //'imagemin:dist',
        'uglify:dist',
        'jade:dist'
    ]);
};