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
        'src/*'
      ]
    },

    browserify: {
      release: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          'public/js/scripts.js' : 'src/app.js'
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
          'jshint', 'browserify', 'uglify'
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
  grunt.registerTask('build', ['test', 'jshint', 'sass', 'browserify', 'uglify']);
  grunt.registerTask('dev', ['build', 'watch', 'nodemon']);

};
