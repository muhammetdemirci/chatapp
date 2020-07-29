import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from "react-native";
import moment from 'moment'

class TextMessage extends React.Component {
    render() {
        const { date, from_username, message } = this.props.message

        return (<View style={{
            marginHorizontal: 8,
            padding: 8,
            borderRadius: 8
        }}>
            <Text style={{
                color: 'black', fontSize: 16,
                alignSelf: 'flex-end',
                marginRight: 4,
            }} >
                {/* {from_username} */}
            </Text>
            <View style={{
                backgroundColor: 'blue',
                padding: 8,
                marginVertical: 4,
                borderRadius: 8
            }} >
                <Text style={{ color: 'white', fontSize: 18 }} >
                    {message}
                </Text>
            </View>
            <Text style={{
                color: 'gray',
                fontSize: 14,
                alignSelf: 'flex-end'
            }} >
                {moment.unix(date).fromNow()}
            </Text>
        </View>)
    }
}
TextMessage.PropTypes = {
    message: PropTypes.object
}

export default TextMessage