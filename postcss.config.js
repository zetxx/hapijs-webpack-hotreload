module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: ['ie >= 9', 'last 2 versions']
    },
    'postcss-nested': true,
    'postcss-mixins': true
  }
}
