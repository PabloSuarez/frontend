module.exports = function(grunt) {

  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          "index.html": ["*.jade"]
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
    }
  });

  // Load grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['stylus', 'jade']);

};