import React, {
  StyleSheet,
  View,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import {
  ACCESS_TOKEN,
  STYLE_URL,
  TRACKING_MODE_FOLLOW,
  TRACKING_MODE_NONE} from '../constants/MapBoxConstants'
import MissionActions from '../actions/MissionActions';
import missionStore from '../stores/MissionStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapRef = 'OpenStreetMap';
const missionLimit = 30;
const missionRadius = 5000;

const MissionsTab = React.createClass({
  mixins: [Mapbox.Mixin],
  locationWatchId: (null: ?number),
  getInitialState() {
    return {
      center: {
        latitude: 0,
        longitude: 0,
      },
      zoom: 13,
      annotations: null,
    };
  },
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onPositionChange);
    this.locationWatchId = navigator.geolocation.watchPosition(this.onPositionChange,
      (error) => console.log(error),
      {enableHighAccurracy: true, distanceFilter: 100});
    missionStore.addChangeListener(this.onMissionsUpdate);
  },
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);
    missionStore.removeChangeListener(this.onChange);

  },
  onPositionChange(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({
      center: {
        latitude: latitude,
        longitude: longitude,
      }
    });

    MissionActions.loadMissions(latitude, longitude, missionLimit, missionRadius);
  },
  onMissionsUpdate() {
    this.updateAnnotations();
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  updateAnnotations() {
    const annotations = [];
    for (let mission of missionStore.getAll()) { // eslint-disable-line prefer-const
      annotations.push({
        id: mission.id,
        type: 'point',
        title: mission.title,
        coordinates: [parseFloat(mission.latitude), parseFloat(mission.longitude)],
      });
    }
    this.setState({ annotations: annotations });
  },
  render() {
    return (
      <View style={styles.container}>
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
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          logoIsHidden
          attributionButtonIsHidden
          onOpenAnnotation={this.onOpenAnnotation}
          userTrackingMode={TRACKING_MODE_NONE}
        />
      </View>
    );
  },
});

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
