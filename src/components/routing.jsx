import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  render() {
    {
      this.createLeafletElement();
    }
    return "Hi";
  }

  createLeafletElement() {
    // console.log(this.props);
    console.log("Routing Rendered");

    const { map, startingCoords, endingCoords, vehicle } = this.props;

    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    // var lat = localStorage.getItem("lat");
    // var lng = localStorage.getItem("long");

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(startingCoords[0], startingCoords[1]),
        L.latLng(endingCoords[0], endingCoords[1]),
        // L.latLng(27.68, 85.321),
        // L.latLng(27.7, 85.331),
      ],
      router: L.Routing.graphHopper(apiGraphHopper, {
        urlParameters: {
          vehicle: vehicle,
        },
      }),
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
