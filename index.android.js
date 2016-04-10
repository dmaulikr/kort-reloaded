import React, {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';

const mapRef = 'OpenStreetMap';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const Kort = React.createClass({
  mixins: [Mapbox.Mixin],
  getInitialState() {
    return {
      center: {
        latitude: 47.223,
        longitude: 8.817,
      },
      zoom: 10,
    };
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

AppRegistry.registerComponent('Kort', () => Kort);
