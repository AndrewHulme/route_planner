import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import "lrm-graphhopper";

class RoutingRoundTrip extends MapLayer {
  render() {
    this.createLeafletElement();
    return "Hi";
  }

  createLeafletElement() {
    const { map, roundTripCoords, vehicle } = this.props;
    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    console.log("hello roundtrip")
    let waypointsArr = [];
    waypointsArr.push(L.latLng(roundTripCoords[0][1], roundTripCoords[0][0]));
    roundTripCoords.forEach((item, i) => {
      if (i % 10 == 0) {
        let coord = L.latLng(item[1], item[0]);
        waypointsArr.push(coord);
      }
    });
    waypointsArr.push(
      L.latLng(
        roundTripCoords[roundTripCoords.length - 1][1],
        roundTripCoords[roundTripCoords.length - 1][0]
      )
    );

    let leafletElement = L.Routing.control({
      waypoints: waypointsArr,

      router: L.Routing.graphHopper(apiGraphHopper, {
        urlParameters: {
          vehicle: vehicle,
        },
      }),
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingRoundTrip);
