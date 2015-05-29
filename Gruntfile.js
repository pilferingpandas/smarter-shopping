module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      my_target: {
        files: {
          'public/js/scripts.min.js' : 'public/js/scripts.js'
        }
      }
    },

    jshint: {
      files: [
        'server/**/*',
        'public/js/*'
      ]
    },

    browserify: {
      release: {
        options: {
          browserifyOptions: {
            debug: true,
            transform: ['reactify'],
            extensions: ['.jsx']
          }
        },
        files: {
          'public/js/scripts.js' : 'src/Router.jsx'
        }
      }
    },

    sass: {
      dist: {
        files: {
          'public/css/style.css' : 'scss/**/*'
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
      dev: {
        files: [
          'src/**/*', 'scss/**/*', 
        ],
        tasks: [
          //'browserify', 'jshint', 'uglify'
          'browserify', 'uglify'
        ]
      },
      test: {
        files: [
          'spec/**/*'
        ],
        tasks: [
          'mochaTest'
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
  //grunt.registerTask('build', ['sass', 'browserify', 'jshint', 'uglify']);
  grunt.registerTask('build', ['sass', 'browserify', 'uglify']);
  grunt.registerTask('dev', ['build', 'nodemon', 'watch']);

};
