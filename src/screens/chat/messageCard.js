import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from "react-native";
import moment from 'moment'
import { COLORS } from '../../color';
import { connect } from "react-redux";

class MessageCard extends React.Component {


    render() {
        const { username, message: {
            date, from_username, message, image, location
        } } = this.props

        const alignItems = username === from_username ? "flex-end" : "flex-start";
        const msgBackgroundColor = username === from_username ? COLORS.GREEN : COLORS.BLUE

        return (<View style={{
            // marginHorizontal: 8,
            padding: 8,
            borderRadius: 8,
            alignItems,
            marginHorizontal: 4,
        }}>
            {
                location ? <TouchableOpacity><Image
                    style={{ width: 160, height: 160, resizeMode: 'contain' }}
                    source={require("../../assets/map.png")} /></TouchableOpacity> : null
            }

            {
                image ? <View style={{
                    // alignItems:'flex-end'
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
            {
                message ? <View style={{
                    backgroundColor: msgBackgroundColor,
                    padding: 8,
                    marginVertical: 4,
                    borderRadius: 8
                }} >

                    <Text style={{ color: 'white', fontSize: 18 }} >
                        {message}
                    </Text>
                </View> : null
            }

            <Text style={{
                color: COLORS.GRAY,
                fontSize: 12,
            }} >
                {moment.unix(date).format("HH:MM")}
            </Text>
        </View>)
    }
}
MessageCard.PropTypes = {
    message: PropTypes.object
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
    }
}

export default connect(mapStateToProps, {})(MessageCard);