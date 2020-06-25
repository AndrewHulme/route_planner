import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, startingCoords, endingCoords } = this.props;
    console.log("YOOOOO");
    console.log(startingCoords);
    console.log(endingCoords);

    // var lat = localStorage.getItem("lat");
    // var lng = localStorage.getItem("long");

    let leafletElement = L.Routing.control({
      waypoints: [
        // L.latLng(51.627534, -0.391221),
        // L.latLng(51.645046, -0.388907),
        // L.latLng(51.627534, -0.391221)
        L.latLng(startingCoords[0], startingCoords[1]),
        L.latLng(endingCoords[0], endingCoords[1]),
        // L.latLng(27.68, 85.321),
        // L.latLng(27.7, 85.331),
      ],
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
