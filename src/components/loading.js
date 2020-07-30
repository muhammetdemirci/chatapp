import React from 'react';
import { View, ActivityIndicator } from "react-native";
import { COLORS } from '../color';


class Loading extends React.Component {
    render() {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator size={'large'} color={COLORS.BLUE} />
        </View>)
    }
}

export default Loading;