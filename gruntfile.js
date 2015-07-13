module.exports = function(grunt) {

  grunt.initConfig({

      jade: {
        compile: {
          options: {
            pretty: true,
          },
          files: {
            "./index.html": ["./lib/index.jade"],
            "./avengers.html": ["./lib/avengers.jade"],
          }
        }
      },

      stylus: {
        compile: {
          options: {
            compress: false,
            paths: ['lib']
          },
          files: {
            'public/css/app.css': 'lib/app.styl'
          }
        }
      },

      babel: {
        options: {
          sourceMap: false
        },
        dist: {
          files: {
            "public/app.js" : "lib/app.js",
            "public/util/marvel-api.js" : "util/marvel-api.js",
          }
        }
      }

  });

  // Load grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['babel', 'jade', 'stylus']);

};
