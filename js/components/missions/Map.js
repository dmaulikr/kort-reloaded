import React from 'react';
import { StyleSheet } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import TaskActions from '../../actions/TaskActions';
import taskStore from '../../stores/TaskStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapRef = 'OpenStreetMap';
const ACCESS_TOKEN = 'pk.eyJ1IjoiZG9taW5pY21oIiwiYSI6ImNpbTIwbHFqbjAwbTN3MW02bWNxbjI4YmEifQ.ZkVpEGDJZXDSmG6fuO8ZZA'; // eslint-disable-line max-len
const STYLE_URL = 'https://raw.githubusercontent.com/osm2vectortiles/osm2vectortiles/gh-pages/styles/bright-v8.json';

const Map = React.createClass({

  mixins: [Mapbox.Mixin],

  getInitialState() {
    return {
      center: {
        latitude: 0,
        longitude: 0,
      },
      zoom: 13,
      annotations: [],
    };
  },

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onPositionChange);
    this.locationWatchId = navigator.geolocation.watchPosition(this.onPositionChange,
      (error) => console.log(error),
      { enableHighAccurracy: true, distanceFilter: 100 });

    taskStore.addChangeListener(this.onTasksUpdate);
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);

    taskStore.removeChangeListener(this.onTasksUpdate);
  },

  onPositionChange(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({ center: { latitude, longitude } });

    TaskActions.loadTasks(latitude, longitude);
  },

  onTasksUpdate() {
    this.updateAnnotations();
  },

  onOpenAnnotation(annotation) {
    console.log(annotation);
  },

  locationWatchId: null,

  updateAnnotations() {
    const annotations = [];

    for (let task of taskStore.getAll()) { // eslint-disable-line prefer-const
      annotations.push({
        id: task.id,
        type: 'point',
        title: task.title,
        coordinates: [parseFloat(task.latitude), parseFloat(task.longitude)],
        task,
      });
    }
    this.setState({ annotations });
  },

  render() {
    return (
      <Mapbox
        centerCoordinate={this.state.center}
        annotations={this.state.annotations}
        style={styles.container}
        direction={0}
        rotateEnabled
        scrollEnabled
        zoomEnabled
        showsUserLocation
        ref={mapRef}
        accessToken={ACCESS_TOKEN}
        styleURL={STYLE_URL}
        zoomLevel={this.state.zoom}
        logoIsHidden
        attributionButtonIsHidden
        onOpenAnnotation={this.onOpenAnnotation}
        userTrackingMode={this.userTrackingMode.follow}
      />
    );
  },
});

module.exports = Map;
