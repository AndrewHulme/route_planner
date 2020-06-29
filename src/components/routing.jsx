import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  state = {
    leafletElement: "",
    //   long: this.props.long,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.generated !== this.props.generated) {
      this.createLeafletElement();
      if (this.props.generated > 1) {
        console.log("YO");
        console.log(this.state.leafletElement);
        this.state.leafletElement.spliceWaypoints(0, 2);
      }
    }
  }
  createLeafletElement() {
    console.log("Create leaflet element called");
    const { map, startingCoords, endingCoords, vehicle } = this.props;
    // console.log("YOOOOO");
    // console.log(startingCoords);
    // console.log(endingCoords);
    // console.log(this.props.vehicle);

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
    });

    this.setState({
      leafletElement: leafletElement,
    });

    leafletElement.addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
