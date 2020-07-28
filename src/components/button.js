import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from "react-native";

class Button extends React.Component {

    render() {

        const { onPress, title, containerStyle, titleStyle } = this.props;

        return (<TouchableOpacity
            style={[containerStyle]}
            onPress={onPress} >
            <Text style={[{ fontSize: 13 }, titleStyle]} >
                {title}
            </Text>
        </TouchableOpacity>)
    }
}

Button.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
}

export default Button;