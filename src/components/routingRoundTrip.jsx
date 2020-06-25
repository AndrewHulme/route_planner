import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class RoutingRoundTrip extends MapLayer {
  createLeafletElement() {
    const { map, roundTripCoords } = this.props;
    console.log("Roundtrip:")

    // var lat = localStorage.getItem("lat");
    // var lng = localStorage.getItem("long");

    console.log(roundTripCoords.replace('[', ''))
    roundTripCoords.replace('[', '');
    roundTripCoords.replace('[', '');

    // let routingObj = {}
    // let waypointsArr = []
    // roundTripCoords.forEach((item) => {
    //   let coord = L.latLng(item[1], item[0]);
    //   waypointsArr.push(coord)
    // });
    // routingObj.waypoints = waypointsArr;
    //
    // console.log(routingObj)

    let leafletElement = L.Routing.control({

      waypoints: [
        // [-0.391221,51.627534],[-0.390801,51.627602],[-0.389936,51.627745],[-0.389318,51.627846]
        L.latLng(51.627534, -0.391221),
        L.latLng(51.627602, -0.390801),
        L.latLng(51.627745, -0.389936),
        L.latLng(51.627846, -0.389318),
      ],
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingRoundTrip);
