import React, {
  StyleSheet,
  View,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
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
const ACCESS_TOKEN = 'pk.eyJ1IjoiZG9taW5pY21oIiwiYSI6ImNpbTIwbHFqbjAwbTN3MW02bWNxbjI4YmEifQ.ZkVpEGDJZXDSmG6fuO8ZZA'; // eslint-disable-line max-len
const STYLE_URL = 'https://raw.githubusercontent.com/osm2vectortiles/osm2vectortiles/gh-pages/styles/bright-v8.json';
const TRACKING_MODE_FOLLOW = 1;

const MissionsTab = React.createClass({

  mixins: [Mapbox.Mixin],

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
      { enableHighAccurracy: true, distanceFilter: 100 });
    missionStore.addChangeListener(this.onMissionsUpdate);
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);
    missionStore.removeChangeListener(this.onMissionsUpdate);
  },

  onPositionChange(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({ center: { latitude, longitude } });

    MissionActions.loadMissions(latitude, longitude, missionLimit, missionRadius);
  },

  onMissionsUpdate() {
    this.updateAnnotations();
  },

  onOpenAnnotation(annotation) {
    console.log(annotation);
  },


  locationWatchId: null,

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
    this.setState({ annotations });
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
          userTrackingMode={TRACKING_MODE_FOLLOW}
        />
      </View>
    );
  },
});

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;