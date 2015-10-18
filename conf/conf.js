module.exports = {
  development: {
    mongo: {
      uri: 'mongodb://localhost/mweb',
      opt: {
        server: { poolSize : 10 }
      }
    }
  },
  production: {
    mongo: {
      uri: 'mongodb://localhost/mweb',
      opt: {}
    }
  }
}
