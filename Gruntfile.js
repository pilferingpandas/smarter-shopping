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

    shell: {
      mongo: {
        command: 'mongod'
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
          'build'
        ]
      },
      test: {
        files: [
          'spec/**/*'
        ],
        tasks: [
          'test'
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
  grunt.loadNpmTasks('grunt-shell');


  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['sass', 'browserify']);
  grunt.registerTask('dev', ['build', 'watch:dev']);
  grunt.registerTask('serve', ['nodemon']);
  grunt.registerTask('deploy', ['shell:herokuDeploy']);

};
