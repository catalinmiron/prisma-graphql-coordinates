const geolib = require('geolib');
const {forwardTo} = require('prisma-binding');

const Query = {
  locations(parent, {radius, lat, lng}, ctx, info) {
    const locationCoord = {latitude: lat, longitude: lng};
    const currentLocationCoords = geolib.getBoundsOfDistance(locationCoord, radius);
    const {maxLat, maxLng, minLat, minLng} = geolib.getBounds(currentLocationCoords)

    return ctx.db.query.locations({
      where: {
        lat_gt: minLat,
        lat_lt: maxLat,
        lng_gt: minLng,
        lng_lt: maxLng
      }
    }, info)
  },
  allLocations(_, args, ctx, info) {
    return ctx.db.query.locations({}, info)
  }
}

module.exports = { Query }
