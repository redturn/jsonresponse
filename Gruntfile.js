// Defines the grunt tasks
module.exports = function (grunt) {
  
  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

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
          'test/**/*.js'          
        ]
      },
    }
  });

  grunt.registerTask('lint', 'Run linting', [ 'jshint' ]);

};
