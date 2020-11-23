import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import "../orslrm.js";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  state = {
    leafletElement: "",
    leafletElements: [],
  };
  componentDidUpdate(prevProps) {
    if (prevProps.generated !== this.props.generated) {
      this.createLeafletElement();
      if (this.state.leafletElements.length !== 0) {
        this.state.leafletElements.forEach((element) =>
          element.spliceWaypoints(0, 2)
        );
      }
    }
  }

  createLeafletElement() {
    const { map, journeyCoords, vehicle } = this.props;
    var apiORS = process.env.REACT_APP_ROUTE_API_KEY;

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(journeyCoords[0][0], journeyCoords[0][1]),
        L.latLng(journeyCoords[1][0], journeyCoords[1][1]),
      ],
      router: new L.Routing.openrouteserviceV2(apiORS, {
        profile: vehicle,
      }),
    });

    this.setState((prevState) => ({
      leafletElements: [...prevState.leafletElements, leafletElement],
    }));

    if (this.props.generated < 1) {
      leafletElement.spliceWaypoints(0, 2);
    }

    leafletElement.addTo(map.leafletElement);

    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map.leafletElement);

    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
