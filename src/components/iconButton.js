import React from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class IconButton extends React.Component {
    render() {
        const { disabled, onPress, containerStyle, iconStyle, name, size } = this.props
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                style={containerStyle}>
                <Icon style={iconStyle} name={name} size={size} />
            </TouchableOpacity>
        );
    }
}

IconButton.propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    name: PropTypes.string,
    size: PropTypes.number,
}

export default IconButton;