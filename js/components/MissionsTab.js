import React, {
  StyleSheet,
  View,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import MissionActions from '../actions/MissionActions';
import missionStore from '../stores/MissionStore';

const mapRef = 'OpenStreetMap';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  mixins: [Mapbox.Mixin],
  getInitialState() {
    return {
      center: {
        latitude: 47.22319,
        longitude: 8.81662,
      },
      zoom: 14,
      missions: missionStore.getAll(),
    };
  },
  componentDidMount() {
    missionStore.addChangeListener(this.onChange);
    MissionActions.loadMissions(47.22319, 8.81662, null, null);
  },
  componentWillUnmount() {
    missionStore.removeChangeListener(this.onChange);
  },
  onChange() {
    this.updateAnnotations(missionStore.getAll());
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  updateAnnotations(missions) {
    const annotations = [];
    this.removeAllAnnotations(mapRef);
    for (let mission of missions) { // eslint-disable-line prefer-const
      annotations.push({
        id: mission.id,
        type: 'point',
        title: mission.title,
        coordinates: [parseFloat(mission.latitude), parseFloat(mission.longitude)],
      });
    }
    this.addAnnotations(mapRef, annotations);
  },
  render() {
    return (
      <View style={styles.container}>
        <Mapbox
          annotations={this.state.annotations}
          style={styles.container}
          direction={0}
          rotateEnabled
          scrollEnabled
          zoomEnabled
          showsUserLocation
          ref={mapRef}
          accessToken={'pk.eyJ1IjoiZG9taW5pY21oIiwiYSI6ImNpbTIwbHFqbjAwbTN3MW02bWNxbjI4YmEifQ.ZkVpEGDJZXDSmG6fuO8ZZA'}
          styleURL={'https://raw.githubusercontent.com/osm2vectortiles/osm2vectortiles/gh-pages/styles/bright-v8.json'}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          logoIsHidden
          attributionButtonIsHidden
          onOpenAnnotation={this.onOpenAnnotation}
        />
      </View>
    );
  },
});

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
