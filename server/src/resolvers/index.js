const { Query } = require('./Query')
const { location } = require('./Mutation/location')

module.exports = {
  Query,
  Mutation: {
    ...location
  },
}
