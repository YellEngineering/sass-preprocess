/*
 * sass-preprocess
 * https://github.com/45629Ar/sass-preprocess
 *
 * Copyright (c) 2018 Arshdeep Soni
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sass-preprocess', 'Add global variables, mixins and functions automatically to each .scss file', function() {
    // Merge task-specific and/or target-specific options with these defaults.


    var options = this.options({
      template: '',
      data: {
        mixins: '',
        prefixes: '',
        functions: '',
        gruntvariables: ''
      },
      ext: '.processed.scss'
    });

    const template = grunt.file.read(options.template);

    this.files.forEach(function(f) {

      f.src.forEach(function(filepath, index) {

        // extend options.data object
        // add current sass file contents
        var data = {};
        Object.keys(options.data).forEach(function(key) {
          var value = options.data[key];
          // write file contents if file exists otherwise use value
          data[key] = grunt.file.exists(value) ? grunt.file.read(value) : value;
        })
        data.sass = grunt.file.read(filepath);
  
        
        // output of template processing
        var output = grunt.template.process(template, { data: data });

        // get full extension from current filename
        var fullExtension = '.' + filepath.split('.').splice(1).join('.');

        // replace old extension with new extension
        var newFilename = filepath.replace(fullExtension, options.ext);

        // write to destination
        grunt.file.write(newFilename, output, {
          encoding: 'utf-8'
        });

      }); 
    }); 

  });

};
