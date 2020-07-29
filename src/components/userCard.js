import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

const width = Dimensions.get("window").width

class UserCard extends React.Component {

    get avatar() {
        return this.props.data.username[0] + this.props.data.username[1]
    }

    render() {

        return (<TouchableOpacity
            onPress={() => this.props.onPress(this.props.data)}
            style={{
                backgroundColor: 'white', marginVertical: 2, flexDirection: 'row',
                alignItems: 'center',
                width: width - 8
            }} >
            <View style={{
                width: 50, height: 50,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'rgb(200,200,200)',
                justifyContent: 'center', alignItems: 'center',
                margin: 8,
            }}>
                <Text style={{
                    fontSize: 18, fontWeight: '600',
                    color: 'blue'
                }} >{this.avatar}</Text>
            </View>
            <Text style={{ margin: 8, fontSize: 16 }} >
                {this.props.data.username}
            </Text>
        </TouchableOpacity>)
    }
}

UserCard.propTypes = {
    username: PropTypes.string,
    onPress: PropTypes.func,
}

export default UserCard;