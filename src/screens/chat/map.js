import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class MapScreen extends React.Component {
    render() {
        console.warn('location', this.props.navigation.state.params.location)
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title={'Muhammet'}
                />

            </MapView>)
    }
}

export default MapScreen;