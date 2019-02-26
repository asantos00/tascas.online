import React from "react"
import PropTypes from 'prop-types';
import { graphql } from 'gatsby'
import ReactMapGL, { FlyToInterpolator } from "react-map-gl"
import Marker from './marker';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYXNhbnRvczAwIiwiYSI6ImNpZnhxeDZkdTAyOHF0MG03Z2xndnM1ZDkifQ.qmxaAFvrBNvNSmOr5y9xpw'

const DEFAULT_LOCATION = {
  latitude: 38.7223,
  longitude: -9.1393
}

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
      ...DEFAULT_LOCATION,
      zoom: 13,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator(),
    },
    open: undefined,
  }

  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props;

    if (!latitude || !longitude) {
      return;
    }

    if (prevProps.latitude !== latitude || prevProps.longitude !== longitude) {
      this.updateViewport(latitude, longitude);
    }
  }

  updateViewport = (latitude, longitude) => {
    this.setState(({viewport}) => ({
      viewport: {
        ...viewport,
        latitude,
        longitude,
        zoom: 14,
        transitionDuration: 300,
        transitionInterpolator: new FlyToInterpolator(),
      }
    }))
  }

  onMarkerClick = (place) => {
    const { onSelectPlace } = this.props;
    const { coordinates: { lat, lng } }  = place

    onSelectPlace(place)
    this.updateViewport(lat, lng);
  }

  onMarkerOutsideClick = () => {
    const { onSelectPlace } = this.props;
    this.setState({ open: undefined });

    onSelectPlace()
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
            onOutsideClick={this.onMarkerOutsideClick}
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
