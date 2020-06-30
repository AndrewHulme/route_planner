import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  state = {
    leafletElement: '',
    leafletElements: [],
  };
  componentDidUpdate(prevProps) {
    console.log(this.state.leafletElements);
    console.log(this.props.generated);

    console.log('Props :', prevProps.generated, this.props.generated);
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
    const { map, startingCoords, endingCoords, vehicle } = this.props;
    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(startingCoords[0], startingCoords[1]),
        L.latLng(endingCoords[0], endingCoords[1]),
      ],
      router: L.Routing.graphHopper(apiGraphHopper, {
        urlParameters: {
          vehicle: vehicle,
        },
      }),
    });

    console.log('createLeafletElement: What is leaflet element?!');
    console.log(leafletElement);

    this.setState((prevState) => ({
      leafletElements: [...prevState.leafletElements, leafletElement],
    }));

    if (this.props.generated < 1) {
      leafletElement.spliceWaypoints(0, 2);
    }

    leafletElement.addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
