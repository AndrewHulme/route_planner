import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, startingCoords, endingCoords } = this.props;
    console.log('YOOOOO');
    console.log(startingCoords);
    console.log(endingCoords);

    // var lat = localStorage.getItem("lat");
    // var lng = localStorage.getItem("long");

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(startingCoords[0], startingCoords[1]),
        L.latLng(endingCoords[0], endingCoords[1]),
        // L.latLng(27.68, 85.321),
        // L.latLng(27.7, 85.331),
      ],

      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      router: L.Routing.graphHopper('a585904f-5193-4605-bc3c-870c4f472177', {
        urlParameters: {
          vehicle: 'car',
        },
      }),
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
