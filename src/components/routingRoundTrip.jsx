import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import "lrm-graphhopper";

class RoutingRoundTrip extends MapLayer {
  createLeafletElement() {
    const { map, roundTripCoords } = this.props;
    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    let routingObj = {};
    let waypointsArr = [];
    let i = 0;
    roundTripCoords.forEach((item) => {
      i += 1;
      if (i % 10 == 0) {
        let coord = L.latLng(item[1], item[0]);
        waypointsArr.push(coord);
      }
    });
    routingObj.waypoints = waypointsArr;
    console.log(routingObj);

    let leafletElement = L.Routing.control({
      // routingObj,
      //   {
      waypoints: waypointsArr,

      router: L.Routing.graphHopper(apiGraphHopper, {
        urlParameters: {
          vehicle: "foot",
        },
      }),
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingRoundTrip);
