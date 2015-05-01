var grunt = require('grunt');
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  watch: {
    react: {
      files: 'react_components/**/*.jsx',
      tasks: ['browserify']
    }
  },
  browserify: {
    options: {
      transform: [require('grunt-react').browserify]
    },
    client: {
      src: ['react_components/**/*.jsx'],
      dest: './public/js/build.js'
    }
  }
});
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('build', ['browserify']);
grunt.registerTask('default', ['watch']);