import React, {
  StyleSheet,
  View,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import { getMissions } from '../service/MissionLoader';

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
    };
  },
  componentDidMount() {
    getMissions(47.22319, 8.81662, null, null, this.updateAnnotations);
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  updateAnnotations(missions) {
    const annotations = new Array(missions.length);
    this.removeAllAnnotations(mapRef);
    for (let i = 0; i < missions.length; i++) {
      annotations[i] = {
        id: missions[i].id,
        type: 'point',
        title: missions[i].title,
        coordinates: [parseFloat(missions[i].latitude), parseFloat(missions[i].longitude)],
      };
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
