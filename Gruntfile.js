// Defines the grunt tasks
module.exports = function (grunt) {
  
  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.initConfig({

    // Lint configuration
    jshint: {
      server: {
        options: {
          node: true,
          browser: false,
          laxcomma: true, // Allow next line commas
          trailing: true, // Trailing whitespace errors
          undef: true     // Undefined variable usage errors
        },
        src: [
          'Gruntfile.js',
          'lib/**/*.js',
        ]
      },
      tests: {
        options: {
          node: true,
          browser: false,
          laxcomma: true, // Allow next line commas
          trailing: true, // Trailing whitespace errors
          undef: true,    // Undefined variable usage errors
          expr: true,     // Suppress warnings about expressions (chai)
          globals: {
            "describe"   : false,
            "it"         : false,
            "before"     : false,
            "beforeEach" : false,
            "after"      : false,
            "afterEach"  : false
          }
        },
        src: [
          'test/**/*.js'
        ]
      }
    },

    // Testing
    mochacli: {
      options: {
        ui: 'bdd',
        reporter: 'spec'        
      },
      all: [ 'test/**/*.js' ]
    }
  });

  grunt.registerTask('lint', 'Run linting', [ 'jshint' ]);
  grunt.registerTask('test', 'Run tests (mocha)', [ 'mochacli' ]);
  grunt.registerTask('validate', 'Runs tests and lint code', [ 'jshint', 'mochacli' ]);

};
