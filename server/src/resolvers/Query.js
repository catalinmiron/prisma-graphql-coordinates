const geolib = require('geolib');
const {forwardTo} = require('prisma-binding');

// function getBoundsRadius(maxLat, maxLng, lat, lng){
//   // r = radius of the earth in km
//   var r = 6378.8
//   // degrees to radians (divide by 57.2958)
//   var ne_lat = maxLat / 57.2958
//   var ne_lng = maxLng / 57.2958
//   var c_lat = lat / 57.2958
//   var c_lng = lng / 57.2958
//   // distance = circle radius from center to Northeast corner of bounds
//   var r_km = r * Math.acos(
//     Math.sin(c_lat) * Math.sin(ne_lat) +
//     Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
//     )
//   return r_km *1000 // radius in meters
// }

const Query = {
  locations(parent, {radius, lat, lng}, ctx, info) {
    const locationCoord = {latitude: lat, longitude: lng};
    const currentLocationCoords = geolib.getBoundsOfDistance(locationCoord, radius / 1.402);
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
