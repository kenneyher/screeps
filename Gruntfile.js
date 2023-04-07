module.exports = function(grunt) {
  grunt.initConfig({
    screeps: {
      options: {
        email: 'kencris007@gmail.com',
        token: 'cb0de242-267a-497b-9d64-f51191226607',
        branch: 'default',
      },
      dist: {
        src: ['dist/*.js']
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['babel', 'screeps']);
}
