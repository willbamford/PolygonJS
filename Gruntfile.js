module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['polygonjs/**/*.js']
        },
        jasmine: {
            all: {
                options: {
                    specs: 'tests/specs/**/*-spec.js',
                    helpers: ['tests/spec/matchers.js'],
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '',
                    name: 'polygonjs/polygonjs',
                    out: 'dist/polygonjs.min.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['jshint', 'jasmine']);
    grunt.registerTask('compile', ['jshint', 'jasmine', 'requirejs']);
};