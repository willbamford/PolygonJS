module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['iso-svg/**/*.js']
        },
        jasmine: {
            all: {
                options: {
                    specs: 'tests/spec/**/*-spec.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '',
                    name: 'iso-svg/iso-svg',
                    out: "dist/iso-svg.min.js"
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