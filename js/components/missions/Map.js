import React from 'react';
import { DeviceEventEmitter, Platform, StyleSheet } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import { Actions } from 'react-native-router-flux';

import Config from '../../constants/Config';
import TaskActions from '../../actions/TaskActions';

import locationStore from '../../stores/LocationStore';
import taskStore from '../../stores/TaskStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 45,
  },
});

const mapRef = Config.MAP_REF;
const accessToken = Config.MAPBOX_ACCESS_TOKEN;
const styleUrl = Config.STYLE_URL;
const zoomLevel = Config.ZOOM_LEVEL;

export default React.createClass({
  mixins: [Mapbox.Mixin],

  getInitialState() {
    return {
      annotations: [],
    };
  },

  componentWillMount() {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('onOpenAnnotation', this.onOpenAnnotation);
    }
    locationStore.addChangeListener(this.onLocationChange);
    taskStore.addChangeListener(this.onTasksUpdate);
  },

  componentDidMount() {
    if (taskStore.getAll() !== null) this._updateAnnotations();
  },

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.removeAllListeners();
    }
    locationStore.removeChangeListener(this.onTasksUpdate);
    taskStore.removeChangeListener(this.onTasksUpdate);
  },

  onLocationChange() {
    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());
  },

  onOpenAnnotation(annotation) {
    let taskId;
    if (Platform.OS === 'android') {
      taskId = annotation.src.subtitle;
    } else {
      taskId = annotation.subtitle;
    }
    const annotationTask = taskStore.get(taskId);
    Actions.solveTask({ task: annotationTask });
  },

  updateAnnotations() {
    const annotations = [];

    for (const task of taskStore.getAll()) {
      annotations.push({
        id: task.id,
        type: 'point',
        title: task.title,
        subtitle: task.id,
        coordinates: [parseFloat(task.latitude), parseFloat(task.longitude)],
        annotationImage: { url: `image!${task.annotationImage}`, width: 35, height: 42 },
      });
    }
    this.setState({ annotations });
  },

  render() {
    return (
      <Mapbox
        centerCoordinate={locationStore.getPosition().coords}
        annotations={this.state.annotations}
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
        onOpenAnnotation={this.onOpenAnnotation}
      />
    );
  },
});
