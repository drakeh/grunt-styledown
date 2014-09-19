/*
 * grunt-styledown
 * https://github.com/drakeh/grunt-styledown
 *
 * Copyright (c) 2014 Drake Hampton
 * Licensed under the MIT license.
 */

'use strict';

var Styledown = require('styledown');
var chalk = require('chalk');

module.exports = function (grunt) {

    grunt.registerMultiTask('styledown', 'Grunt plugin to generate style guides via styledown', function () {

        var options = this.options();

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            var src, html;

            // Build file source array suitable for passing to Styledown.
            // Each item expected to have 'name' and 'data' keys.
            src = file.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                return { name: filepath, data: grunt.file.read(filepath) };
            });

            // Let Styledown do its thing
            try {
                html = Styledown.parse(src, options);
            } catch (err) {
                grunt.fail.warn(err);
            }

            // Write the destination file.
            grunt.file.write(file.dest, html);

            // Print a success message.
            grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created.');
        });
    });
};
