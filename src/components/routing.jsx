import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  state = {
    leafletElement: "",
    leafletElements: [],
  };
  componentDidUpdate(prevProps) {
    console.log("Props :", prevProps.generated, this.props.generated);
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
    console.log(this.props.generated);
    const { map, journeyCoords, vehicle } = this.props;
    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(journeyCoords[0][0], journeyCoords[0][1]),
        L.latLng(journeyCoords[1][0], journeyCoords[1][1]),
      ],
      router: L.Routing.graphHopper(apiGraphHopper, {
        urlParameters: {
          vehicle: vehicle,
        },
      }),
    });

    console.log("createLeafletElement: What is leaflet element?!");
    console.log(leafletElement);

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
