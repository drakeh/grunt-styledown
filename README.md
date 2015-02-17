# grunt-styledown

> Grunt plugin to generate style guides via Styledown

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-styledown --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-styledown');
```

## The "styledown" task

### Overview
In your project's Gruntfile, add a section named `styledown` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  styledown: {
    build: {
      files: {
        'dist/styleguide/index.html': ['src/styleguide/*.md']
      },
      options: {
        css: 'dist/css/my-styles.css'
        js: 'dist/js/my-scripts.js'
        title: 'My Style Guide'
      }
    },
  },
})
```

### Options

#### css
Type: `String` or `Array`  
Default: none

One or multiple CSS file paths to reference from the styleguide. `<link>` tags will be included in the style guide `<head>` for each path.

#### js
Type: `String` or `Array`  
Default: none

One or multiple JavaScript file paths to reference from the styleguide. `<script>` tags will be included at the bottom of the style guide `<body>` for each path.

#### title
Type: `String`  
Default: Styledown

A title to use in the style guide's `<title>` tag.

#### sg_css
Type: `String` or `Array`  
Default: https://cdn.rawgit.com/styledown/styledown/v1.0.1/data/styledown.css

One or multiple supporting CSS file paths to reference from the styleguide. By default, this will be the supporting CSS file packaged with the latest version of Styledown. Set to `null` to remove.

#### sg_js
Type: `String` or `Array`  
Default: https://cdn.rawgit.com/styledown/styledown/v1.0.1/data/styledown.js

One or multiple supporting JavaScript file paths to reference from the styleguide. By default, this will be the supporting JavaScript file packaged with the latest version of Styledown. Set to `null` to remove.

#### config
Type: `String`  
Default : none

A Styledown [Markdown configuration file](https://github.com/styledown/styledown/blob/master/docs/Configuration.md).

_Warning:_ Setting the styleguide's `<head>` content via this file will overwrite the `css`, `sg_css`, and `title` options described above. Similarly, any `<body>` content set via this file will overwrite the `js` and `sg_js` options.
 
### Usage Examples
Coming soon.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Drake Hampton. Licensed under the MIT license.
