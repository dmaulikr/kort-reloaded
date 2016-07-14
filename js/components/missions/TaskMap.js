import React from 'react';
import { StyleSheet } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';

import Config from '../../constants/Config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapRef = Config.MAP_REF;
const accessToken = Config.MAPBOX_ACCESS_TOKEN;
const styleUrl = Config.STYLE_URL;
const zoomLevel = Config.TASK_ZOOM_LEVEL;

export default React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
  },

  mixins: [Mapbox.Mixin],

  getInitialState() {
    return {
      annotation: [],
    };
  },

  updateAnnotations() {
    const annotation = [];

    annotation.push({
      id: this.props.task.id,
      type: 'point',
      title: this.props.task.title,
      subtitle: this.props.task.id,
      coordinates: [parseFloat(this.props.task.latitude), parseFloat(this.props.task.longitude)],
      annotationImage: { url: `image!${this.props.task.annotationImage}`, width: 36, height: 36 },
    });
    this.setState({ annotation });
  },

  render() {
    const coordinates = {
      speed: 0,
      heading: 0,
      accuracy: 20,
      longitude: parseFloat(this.props.task.longitude),
      altitude: 0,
      latitude: parseFloat(this.props.task.latitude),
    };
    return (
      <Mapbox
        centerCoordinate={coordinates}
        annotations={this.state.annotation}
        style={styles.container}
        direction={0}
        rotateEnabled
        scrollEnabled
        zoomEnabled
        zoomLevel={zoomLevel}
        showsUserLocation
        ref={mapRef}
        accessToken={accessToken}
        styleURL={styleUrl}
      />
    );
  },
});
