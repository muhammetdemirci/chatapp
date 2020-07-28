import React from 'react';
import { View, Text } from 'react-native'
import { IconButton } from '../components';

class ConversationScreen extends React.Component {

    render() {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text>ConversationScreen # TODO</Text>
            <IconButton
                onPress={() => this.props.navigation.navigate('Userlist')}
                name={"add"} size={50} iconStyle={{ color: 'blue' }} />
        </View>);
    }
}

export default ConversationScreen;