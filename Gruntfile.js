module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      my_target: {
        files: {
          /* from */ : /* to */
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
          /* from */: /* to */
        }
      }
    },

    sass: {
      options: {
        // add options
      },
      dist: {
        files: {
          // what to sass
        }
      }
    },

    nodemon: {
      dev: {
        script: // server file
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: // spec
        },
        src: [/*spec src*/]
      }
    },

    watch: {
      scripts: {
        files: [
          // files to watch
        ],
        tasks: [
          // tasks to do
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
