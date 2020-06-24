import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, lat, lng } = this.props;
    // console.log(lat);
    // console.log(lng);

    // var lat = localStorage.getItem("lat");
    // var lng = localStorage.getItem("long");

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(lat, lng),
        // L.latLng(lat, lng),
        // L.latLng(27.68, 85.321),
        // L.latLng(27.7, 85.331),
      ],
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
