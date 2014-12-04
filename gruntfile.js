module.exports = function (grunt) {

  "use strict";

  grunt.initConfig(
      {
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
          base: {
            src: ['ts/**/*.ts'],
            dest: 'www/js',
            options: {
              module: 'amd',
              target: 'es5',
              basePath: 'ts/',
              sourceMap: false,
              declaration: false
            }
          }
        },

        copy: {
          base: {
            files: [
              {expand: true, src: ['js/*'], dest: 'www', filter: 'isFile'},
              {expand: true, src: ['css/*'], dest: 'www', filter: 'isFile'},
              {expand: true, cwd: 'html/', src: ['./**'], dest: 'www/', filter: 'isFile'},
              {expand: true, src: ['img/*'], dest: 'www', filter: 'isFile'}
            ]}
        },

        less: {
          options: {
            paths: ['less']
          },
          // target name
          src: {
            // no need for files, the config below should work
            expand: true,
            cwd: "less",
            src: "*.less",
            ext: ".css",
            dest: 'www/css'
          }
        },

        watch: {
          src: {
            files: ['js/**', 'ts/**', 'html/**', 'css/**', 'img/**', 'less/**'],
            tasks: ['default']
          }
        },

        clean: {
          build: ['www']
        }

      });

  // Register tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('build', ['copy', 'typescript', 'less']);
  grunt.registerTask('test', ['default']);
  grunt.registerTask('default', ['build']);
};