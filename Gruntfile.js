module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: 'js/*.js',
            options: {
                specs: 'spec/*Spec.js'
            }
        },
        watch: {
            files: ['js/*.js', 'spec/*.js'],
            tasks: 'test'
        }
    });

    // Load plugin(s)
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Register task(s).
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['jasmine', 'watch']);
};