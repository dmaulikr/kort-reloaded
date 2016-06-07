import React from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
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
      annotations: null,
    };
  },

  componentDidMount() {
    DeviceEventEmitter.addListener('onOpenAnnotation', this.onOpenAnnotation);
    locationStore.addChangeListener(this.onLocationChange);
    taskStore.addChangeListener(this.onTasksUpdate);

    if (taskStore.getAll() !== null) this._udpateAnnotations();
  },

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
    locationStore.removeChangeListener(this.onTasksUpdate);
    taskStore.removeChangeListener(this.onTasksUpdate);
  },

  onLocationChange() {
    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());
  },

  onOpenAnnotation(annotation) {
    if (require('react-native').Platform.OS === 'android') {
      let annotationTask;

      //Logik in store einbauen
      for (const task of taskStore.getAll()) {
        if (annotation.src.subtitle === task.id) {
          annotationTask = task;
        }
      }

      Actions.solveTask({ title: annotation.src.title, task: annotationTask });
    } else {
      Actions.solveTask({ title: annotation.title, task: annotationTask });
    }
  },

  onTasksUpdate() {
    this._updateAnnotations();
  },

  _updateAnnotations() {
    const annotations = [];

    for (const task of taskStore.getAll()) {
      annotations.push({
        id: task.id,
        type: 'point',
        title: task.title,
        subtitle: task.id,
        coordinates: [parseFloat(task.latitude), parseFloat(task.longitude)],
        task,
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
