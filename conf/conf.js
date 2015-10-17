module.exports = {
  development: {
    mongo: {
      uri: 'mongodb://localhost/mweb-develop',
      opt: {}
    }
  },
  production: {
    mongo: {
      uri: 'mongodb://localhost/mweb',
      opt: {}
    }
  }
}
