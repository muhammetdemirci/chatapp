import React from 'react';
import { View, Text } from 'react-native'
import { Button } from '../components';

class UserListScreen extends React.Component {

    render() {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text>UserListScreen # TODO</Text>
            <Button
                onPress={() => this.props.navigation.navigate('Chat')}
                title={'Start to chat'}
                containerStyle={{
                    backgroundColor: 'blue',
                    margin: 8, padding: 8, justifyContent: 'center', alignItems: 'center'
                }}
                titleStyle={{ color: 'white' }}
            />
        </View>);
    }
}

export default UserListScreen;