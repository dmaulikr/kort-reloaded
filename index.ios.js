import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';

const mapRef = 'OpenStreetMap';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Kort extends Component {
  constructor() {
    super();
    this.mixins = [Mapbox.Mixin];
  }
  getInitialState() {
    return {
      center: {
        latitude: 47.223,
        longitude: 8.817,
      },
      zoom: 10,
      annotations: [{
        coordinates: [47.3, 8.9],
        type: 'point',
        title: 'Important!',
        subtitle: 'Neat, this is a custom annotation image',
        id: 'marker2',
        annotationImage: {
          url: 'https://cldup.com/7NLZklp8zS.png',
          height: 25,
          width: 25,
        },
      }],
    };
  }
  onUserLocationChange(location) {
    console.log(location);
  }
  onLongPress(location) {
    console.log(location);
  }
  onOpenAnnotation(annotation) {
    console.log(annotation);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => this.setDirectionAnimated(mapRef, 0)}>
          Set direction to 0
        </Text>
        <Text onPress={() => this.setCenterCoordinateAnimated(mapRef, 47.223, 8.817, 10)}>
          Go to HSR at zoom level 10
        </Text>
        <Text onPress={() => this.addAnnotations(mapRef, [{
          coordinates: [47.2, 8.8],
          type: 'point',
          title: 'This is a new marker',
          id: 'foo' }])}
        >
          Add new marker
        </Text>
        <Text onPress={() => this.setUserTrackingMode(mapRef, this.userTrackingMode.follow)}>
          Set userTrackingMode to follow
        </Text>
        <Text onPress={() => this.removeAllAnnotations(mapRef)}>
          Remove all annotations
        </Text>
        <Text onPress={() => this.setTilt(mapRef, 50)}>
          Set tilt to 50
        </Text>
        <Text onPress={() => this.setVisibleCoordinateBoundsAnimated(
            mapRef, 40.712, -74.227, 40.774, -74.125, 100, 100, 100, 100)}
        >
          Set visible bounds to 40.7, -74.2, 40.7, -74.1
        </Text>
        <Mapbox
          annotations={this.getInitialState().annotations}
          style={styles.container}
          direction={0}
          rotateEnabled
          scrollEnabled
          zoomEnabled
          showsUserLocation
          ref={mapRef}
          accessToken={'pk.eyJ1IjoiZG9taW5pY21oIiwiYSI6ImNpbTIwbHFqbjAwbTN3MW02bWNxbjI4YmEifQ.ZkVpEGDJZXDSmG6fuO8ZZA'}
          styleURL={'https://raw.githubusercontent.com/osm2vectortiles/osm2vectortiles/gh-pages/styles/bright-v8.json'}
          centerCoordinate={this.getInitialState().center}
          zoomLevel={this.getInitialState().zoom}
          logoIsHidden
          attributionButtonIsHidden
          onOpenAnnotation={this.onOpenAnnotation}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Kort', () => Kort);
