import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from "react-native";
import moment from 'moment'

class MessageCard extends React.Component {
    render() {
        const { date, from_username, message, image } = this.props.message
        return (<View style={{
            // marginHorizontal: 8,
            padding: 8,
            borderRadius: 8,
            alignItems: 'flex-end'
        }}>
            <Text style={{
                color: 'black', fontSize: 16,
                alignSelf: 'flex-end',
                marginRight: 4,
            }} >
                {/* {from_username} */}
            </Text>
            {
                image ? <View style={{
                    alignItems:'flex-end'
                }} >
                    <Image
                        source={{ uri: image.uri }}
                        // source={{ uri: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }}
                        style={{
                            width: 300, height: 200,
                            resizeMode: 'center', marginBottom: 0,
                            bottom: 0,
                            margin: 4
                        }}
                    />
                </View> : null
            }
            <View style={{
                backgroundColor: 'blue',
                padding: 8,
                margin: 4,
                // marginVertical: 4,
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
MessageCard.PropTypes = {
    message: PropTypes.object
}

export default MessageCard