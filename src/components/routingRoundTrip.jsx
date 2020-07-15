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
    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    let waypointsArr = [];
    if (roundTripCoords !== "") {
      waypointsArr.push(L.latLng(roundTripCoords[0][1], roundTripCoords[0][0]));

      let waypointNumber = 5;

      if (roundTripCoords.length < 200) {
        waypointNumber = 5;
      } else if (roundTripCoords.length < 350) {
        waypointNumber = 10;
      } else if (roundTripCoords.length < 500) {
        waypointNumber = 15;
      } else if (roundTripCoords.length < 650) {
        waypointNumber = 20;
      } else if (roundTripCoords.length < 800) {
        waypointNumber = 25;
      } else if (roundTripCoords.length < 950) {
        waypointNumber = 30;
      } else if (roundTripCoords.length < 1100) {
        waypointNumber = 35;
      } else if (roundTripCoords.length < 1250) {
        waypointNumber = 40;
      } else if (roundTripCoords.length < 1400) {
        waypointNumber = 45;
      } else if (roundTripCoords.length < 1550) {
        waypointNumber = 50;
      } else {
        waypointNumber = 100;
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

      // router: L.Routing.graphHopper(apiGraphHopper, {
      //   urlParameters: {
      //     vehicle: vehicle,
      //   },
      // }),
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
