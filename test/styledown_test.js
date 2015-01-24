'use strict';

var grunt = require('grunt');
var cheerio = require('cheerio');

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

var read = function(src) {
    return grunt.util.normalizelf(grunt.file.read(src));
};

exports.styledown = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },

    single_markdown_file: function (test) {
        test.expect(1);

        var actual = read('tmp/simple_markdown.html').trim();
        var expected = read('test/expected/simple.html').trim();
        test.equal(actual, expected, 'should create styleguide from Markdown file');

        test.done();
    },

    single_css_file: function (test) {
        test.expect(1);

        var actual = read('tmp/simple_css.html').trim();
        var expected = read('test/expected/simple.html').trim();
        test.equal(actual, expected, 'should create styleguide from CSS file');

        test.done();
    },

    default_sg_css: function (test) {
        test.expect(1);

        var $ = cheerio.load(read('tmp/standard.html'));

        test.equal($('head link[href$="styledown.css"]').length, 1,
            'should include default Styledown CSS file in <head>');

        test.done();
    },

    default_sg_js: function (test) {
        test.expect(1);

        var $ = cheerio.load(read('tmp/standard.html'));

        test.equal($('body script[src$="styledown.js"]').length, 1,
            'should include default Styledown JS file in <body>');

        test.done();
    },

    custom_title: function (test) {
        test.expect(1);

        var $ = cheerio.load(read('tmp/custom_title.html'));

        test.equal($('head > title').text(), 'Custom Title',
            'should allow setting a custom page title');

        test.done();
    },
    
    with_config_option: function (test) {
        test.expect(1);
        
        var actual = read('tmp/config_md.html').trim();
        var expected = read('test/expected/config_md.html').trim();
        test.equal(actual, expected, 'should create styleguide with config.md');
        
        test.done();
    }    
};
