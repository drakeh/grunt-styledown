'use strict';

var grunt = require('grunt');

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

        var actual = read('tmp/single_markdown_file').trim();
        var expected = read('test/expected/simple.html').trim();
        test.equal(actual, expected, 'should create styleguide from Markdown file');

        test.done();
    },
    single_css_file: function (test) {
        test.expect(1);

        var actual = read('tmp/single_css_file').trim();
        var expected = read('test/expected/simple.html').trim();
        test.equal(actual, expected, 'should create styleguide from CSS file');

        test.done();
    }
};
