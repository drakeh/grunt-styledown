'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        styledown: {
            simple_markdown: {
                files: {
                    'tmp/simple_markdown.html': ['test/fixtures/simple.md']
                },
                options: {
                    sg_css: null,
                    sg_js: null
                }
            },
            simple_css: {
                files: {
                    'tmp/simple_css.html': ['test/fixtures/simple.css']
                },
                options: {
                    sg_css: null,
                    sg_js: null
                }
            },
            standard: {
                files: {
                    'tmp/standard.html': ['test/fixtures/simple.md']
                }
            },
            custom_title: {
                files: {
                    'tmp/custom_title.html': ['test/fixtures/simple.md']
                },
                options: {
                    title: 'Custom Title'
                }
            },
            config: {
                files: {
                    'tmp/config_md.html': ['test/fixtures/simple.md']
                },
                options: {
                    config: 'test/fixtures/config.md'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'styledown', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
