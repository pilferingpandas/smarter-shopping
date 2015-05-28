module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      my_target: {
        files: {
          'public/**/*' : ''
        }
      }
    },

    jshint: {
      files: [
        'server/**/*',
        'scss/*',
        'src/*'
      ]
    },

    browserify: {
      release: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'src/*': 'public/js/scripts.js'
        }
      }
    },

    sass: {
      dist: {
        files: {
          'scss/*':'public/css/style.css'
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*']
      }
    },

    watch: {
      scripts: {
        files: [
          'src/**/*', 'scss/**/*', 
        ],
        tasks: [
          'jshint', 'browserify', 'uglify'
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['test', 'jshint', 'sass', 'browserify', 'uglify']);
  grunt.registerTask('dev', ['build', 'watch', 'nodemon']);

};
