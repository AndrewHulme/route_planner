import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import "lrm-graphhopper";

class RoutingRoundTrip extends MapLayer {
  state = {
    leafletElement: "",
    leafletElements: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.roundTripGenerated !== this.props.roundTripGenerated) {
      this.createLeafletElement();

      if (this.state.leafletElements.length !== 0) {
        this.state.leafletElements.forEach((element) =>
          element.getPlan().setWaypoints([])
        );
      }
    }
  }

  createLeafletElement() {
    const { map, roundTripCoords, vehicle } = this.props;
    var apiORS = process.env.REACT_APP_ROUTE_API_KEY;

    let waypointsArr = [];
    if (roundTripCoords !== "") {
      waypointsArr.push(L.latLng(roundTripCoords[0][1], roundTripCoords[0][0]));

      let waypointNumber;

      if (roundTripCoords.length > 1550) {
        waypointNumber = 100;
      } else {
        waypointNumber =
          5 + Math.ceil((roundTripCoords.length - 200) / 150) * 5;
      }

      roundTripCoords.forEach((item, i) => {
        if (i % waypointNumber == 0) {
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
    }

    let leafletElement = L.Routing.control({
      waypoints: waypointsArr,
      router: new L.Routing.openrouteserviceV2(apiORS, {
        profile: vehicle,
      }),
    });

    this.setState((prevState) => ({
      leafletElements: [...prevState.leafletElements, leafletElement],
    }));

    if (this.props.roundTripGenerated < 1) {
      leafletElement.getPlan().setWaypoints([]);
    }

    leafletElement.addTo(map.leafletElement);

    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingRoundTrip);
