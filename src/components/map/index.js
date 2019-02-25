import React from "react"
import PropTypes from 'prop-types';
import { graphql } from 'gatsby'
import ReactMapGL, { FlyToInterpolator } from "react-map-gl"
import Marker from './marker';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYXNhbnRvczAwIiwiYSI6ImNpZnhxeDZkdTAyOHF0MG03Z2xndnM1ZDkifQ.qmxaAFvrBNvNSmOr5y9xpw'

class Map extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      coordintes: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      })
    }))
  }

  state = {
    viewport: {
      latitude: 38.7223,
      longitude: -9.1393,
      zoom: 13,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator(),
    },
    open: undefined,
  }

  onMarkerClick = (place) => {
    const { onSelectPlace } = this.props;
    const { coordinates: { lat, lng } }  = place

    onSelectPlace(place)

    this.setState(({viewport}) => ({
      viewport: {
        ...viewport,
        latitude: lat,
        longitude: lng
      }
    }))
  }

  render() {
    const { places } = this.props;
    const { open } = this.state;

    return (
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        {...this.state.viewport}
        width="100%"
        height="100%"
        onViewportChange={({ width, height, ...viewport }) => this.setState({ viewport })}
      >
        {places.map(({node : place }) => (
          <Marker
            isOpen={open === place.title}
            onOutsideClick={() => this.setState({ open: undefined })}
            onClick={() => this.onMarkerClick(place)}
            key={`${place.coordinates.lat}${place.coordinates.lng}`}
            latitude={place.coordinates.lat}
            longitude={place.coordinates.lng}
            {...place}
            />
        ))}
      </ReactMapGL>
    )
  }
}

export default Map
