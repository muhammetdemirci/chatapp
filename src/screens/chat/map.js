import React from 'react';
import MapView, { Marker } from 'react-native-maps';

class MapScreen extends React.Component {
    render() {
        const { location, from_username } = this.props.navigation.state.params

        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={from_username}
                />
            </MapView>)
    }
}

export default MapScreen;