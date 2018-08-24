const Chance = require('chance');
let chance = new Chance('1337'); //special seed :)

const location = {
  async createLocation(parent, { lat, lng }, ctx, info) {
    return ctx.db.mutation.createLocation(
      {
        data: {
          lat,
          lng
        },
      },
      info
    )
  },

  // Example
  // seed(count: 100, minLat: 50, maxLat: 50.1, minLng: 14.4, maxLng: 14.5)
  async seed(parent, {count, minLat, maxLat, minLng, maxLng}, ctx, info) {
    return await Promise.all(
      [...Array(count).keys()].map(async coordinates => {
        await ctx.db.mutation.createLocation(
          {
            data: {
              lat: chance.latitude({min: minLat, max: maxLat}),
              lng: chance.longitude({min: minLng, max: maxLng})
            },
          },
          info
        )
      })
    );
  }
}

module.exports = { location }