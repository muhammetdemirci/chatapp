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
                location ? <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Map', { location, from_username })}
                ><Image
                        style={{ width: 160, height: 160, resizeMode: 'contain' }}
                        source={require("../../assets/map.png")} /></TouchableOpacity> : null
            }

            {
                image ? <View style={{
                }} >
                    <Image
                        source={{ uri: image.uri }}
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

function mapStateToProps(state) {
    return {
        username: state.auth.username,
    }
}

export default connect(mapStateToProps, {})(MessageCard);