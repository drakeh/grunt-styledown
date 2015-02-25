/*
 * grunt-styledown
 * https://github.com/drakeh/grunt-styledown
 *
 * Copyright (c) 2015 Drake Hampton
 * Licensed under the MIT license.
 */

'use strict';

var Styledown = require('styledown');
var chalk = require('chalk');
var extend = require('extend');
var util = require('util');

var defaultOptions = extend({}, Styledown.defaultOptions, {
    head: '',
    sg_css: 'https://cdn.rawgit.com/styledown/styledown/v' + Styledown.version + '/data/styledown.css',
    sg_js: 'https://cdn.rawgit.com/styledown/styledown/v' + Styledown.version + '/data/styledown.js'
});

var buildResourceRefs = function(src, formatter) {
    var items = [];

    if (typeof src  === 'string') {
        items = [src];
    } else if (util.isArray(src)) {
        items = src;
    }

    return items.map(formatter).join('');
};

var buildCssRefs = function(src) {
    return buildResourceRefs(src, function (url) {
        return '<link rel="stylesheet" href="' + url + '" />';
    });
};

var buildJsRefs = function(src) {
    return buildResourceRefs(src, function (url) {
        return '<script src="' + url + '"></script>';
    });
};

module.exports = function (grunt) {

    grunt.registerMultiTask('styledown', 'Grunt plugin to generate style guides via styledown', function () {

        var options = this.options(defaultOptions);

        options.head += buildCssRefs(options.sg_css);
        options.head += buildCssRefs(options.css);

        options.body += buildJsRefs(options.sg_js);
        options.body += buildJsRefs(options.js);

        if (options.title) {
            options.template = options.template.replace(/<title>.*<\/title>/i,
                '<title>' + options.title + '</title>');
        }

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            var srcFiles, src, html;

            // Warn on and remove invalid source files (if nonull was set).
            srcFiles = file.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            // Add the Styledown config to the source list, if specified
            if (options.config) {
                srcFiles.push(options.config);
            }

            // Build file source array suitable for passing to Styledown.
            // Each item expected to have 'name' and 'data' keys.
            src = srcFiles.map(function (filepath) {
              return { name: filepath, data: grunt.file.read(filepath) };
            });

            // Let Styledown do its thing.
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
